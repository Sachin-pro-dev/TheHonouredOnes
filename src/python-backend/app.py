
# --- Essential Flask Import (MUST be at the top) ---
from flask import Flask, request, jsonify, render_template

# --- Other Standard Library Imports ---
import zipfile
import xml.etree.ElementTree as ET
import io
import os
import base64
import json
import logging

# --- Configure Logging for Server Output ---
# This helps you see what's happening in your console
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Helper Function: Process Aadhaar Offline XML ---
def process_aadhaar_xml(xml_file_content_bytes, share_code):
    """
    Processes the Aadhaar Offline e-KYC XML file (which is a password-protected ZIP).
    Extracts key demographic data (Name, Date of Birth, Gender, Address) and the user's photo.

    Args:
        xml_file_content_bytes (bytes): The raw byte content of the uploaded ZIP file.
        share_code (str): The 4-digit numeric share code (password) for the ZIP file.

    Returns:
        dict: A dictionary containing 'success' status and either extracted data
              or an 'error' message if processing fails.
    """
    try:
        # 1. Load the uploaded ZIP file content into an in-memory byte stream
        zip_file_object = io.BytesIO(xml_file_content_bytes)
        
        with zipfile.ZipFile(zip_file_object, 'r') as zf:
            # 2. Identify the actual XML file within the ZIP archive
            xml_filenames = [name for name in zf.namelist() if name.endswith('.xml')]
            if not xml_filenames:
                logger.warning("No XML file found inside the uploaded ZIP.")
                return {"success": False, "error": "No XML file found inside the uploaded ZIP. Please ensure it's a valid Aadhaar Offline e-KYC file."}
            
            xml_filename = xml_filenames[0] # Assume the first XML file found is the correct one
            
            # 3. Extract the XML content from the ZIP using the provided share code as the password
            # The share code needs to be encoded to bytes for the password parameter.
            xml_content = zf.read(xml_filename, pwd=share_code.encode('utf-8'))
            
            # 4. Parse the XML content into an ElementTree object
            root = ET.fromstring(xml_content)
            
            # --- Extracting Data WITHOUT XML Namespaces ---
            # The 'referenceId' attribute is on the root <OfflinePaperlessKyc> element itself.
            reference_id = root.attrib.get('referenceId', 'N/A')

            # Find the <UidData> element, which is a direct child of the root.
            # Since there's no namespace in your XML, we can find it directly by tag name
            uid_data_element = root.find('UidData')
            
            # If UidData is not found, log an error and return.
            if uid_data_element is None:
                logger.warning(f"UidData element not found in XML. Root tag: {root.tag}. Root attributes: {root.attrib}")
                logger.warning(f"Available child elements: {[child.tag for child in root]}")
                return {"success": False, "error": "Missing 'UidData' section in Aadhaar XML. File might be invalid or unexpected format."}

            # Extract data from <Poi> (Proof of Identity)
            # <Poi> is a child of <UidData>. No namespace prefix needed.
            poi_element = uid_data_element.find('Poi')
            # Use .attrib.get(key, default_value) to avoid KeyError if an attribute is missing
            name = poi_element.attrib.get('name', 'N/A') if poi_element is not None else "N/A"
            dob = poi_element.attrib.get('dob', 'N/A') if poi_element is not None else "N/A"
            gender = poi_element.attrib.get('gender', 'N/A') if poi_element is not None else "N/A"
            
            # Extract address from <Poa> (Proof of Address)
            # <Poa> is also a child of <UidData>.
            poa_element = uid_data_element.find('Poa')
            address_parts = []
            if poa_element is not None:
                # Iterate through common address attributes and collect non-empty values
                for attr in ['careof', 'house', 'street', 'loc', 'vtc', 'po', 'dist', 'subdist', 'state', 'pc', 'country', 'landmark']:
                    value = poa_element.attrib.get(attr)
                    if value and value.strip(): # Check if value exists and is not just whitespace
                        address_parts.append(value.strip())
            # Join address parts with a comma and space; filter(None, ...) removes any empty strings
            address = ", ".join(filter(None, address_parts)) if address_parts else "N/A"

            # Extract photo (base64 encoded string) from <Pht>
            # <Pht> is a child of <UidData>.
            photo_element = uid_data_element.find('Pht')
            photo_base64 = photo_element.text if photo_element is not None else None

            # --- For Debugging and Server Console Output ---
            logger.info(f"Extracted Details: Name={name}, DoB={dob}, Gender={gender}, Address={address}, RefID={reference_id}")
            logger.info(f"Photo Base64 string length: {len(photo_base64) if photo_base64 else 'N/A'}")
            # -------------------------------------------------

            # Return a dictionary with extracted data upon success
            return {
                "success": True,
                "name": name,
                "dob": dob,
                "gender": gender,
                "address": address,
                "referenceId": reference_id,
                "photo": photo_base64 # This will be a base64 encoded string if present
            }
            
    # --- Robust Error Handling ---
    except zipfile.BadZipFile:
        logger.error("ZIP file error: Invalid ZIP file format detected.")
        return {"success": False, "error": "Invalid Aadhaar XML ZIP file or corrupted data. Please ensure you upload the correct file."}
    except KeyError: # This specific error often means the ZIP password (share code) was incorrect
        logger.error("ZIP password error: Incorrect Share Code provided.")
        return {"success": False, "error": "Incorrect 4-digit Share Code (password) for the ZIP file. Please double-check and try again."}
    except ET.ParseError as e:
        logger.error(f"XML parsing error: Failed to parse the XML content. Error: {e}", exc_info=True)
        return {"success": False, "error": f"Failed to parse Aadhaar XML. The file might be invalid or malformed. Error: {e}"}
    except IndexError: # This means the ZIP was empty or didn't contain an XML file
        logger.error("ZIP content error: No XML file found inside the ZIP.")
        return {"success": False, "error": "The uploaded ZIP does not contain an XML file. Please ensure it's a valid Aadhaar Offline e-KYC file."}
    except AttributeError as e: 
        # This common error indicates that an expected XML element (like Poi, Poa, Pht) was not found
        # or an attribute was missing from a found element, often due to an incorrect XPath or unexpected XML structure.
        logger.error(f"Missing expected data in XML (AttributeError): {e}", exc_info=True)
        return {"success": False, "error": f"Could not extract all required details from Aadhaar XML. The file might be incomplete or the format unexpected. Error: {e}"}
    except Exception as e:
        # Catch any other unexpected errors during the processing
        logger.exception("An unexpected server error occurred during XML processing.") # logs error with full traceback
        return {"success": False, "error": f"An unexpected server error occurred. Please try again. ({type(e).__name__}: {e})"}

# --- Flask App Initialization ---
# template_folder='templates' tells Flask where to find your HTML files
app = Flask(__name__, template_folder='templates') 
# app.secret_key is essential for Flask sessions and security; generates a random key
# For a hackathon, os.urandom(24) is fine. For production, use an environment variable.
app.secret_key = os.urandom(24) 

# --- Flask Routes ---

@app.route('/')
def index():
    """
    Renders the main HTML page where the user can upload their Aadhaar XML.
    """
    return render_template('index.html')

@app.route('/verify-aadhaar', methods=['POST'])
def verify_aadhaar():
    """
    Handles the Aadhaar XML file upload and initiates the verification process.
    This endpoint receives the ZIP file and share code from the frontend.
    """
    # 1. Basic input validation: Check if a file part exists in the request
    if 'aadhaarFile' not in request.files:
        logger.warning("No 'aadhaarFile' part found in the request from the client.")
        return jsonify({"success": False, "error": "No file uploaded. Please select your Aadhaar XML ZIP file."}), 400
    
    file = request.files['aadhaarFile']
    # Get the share code from the form data, strip leading/trailing whitespace
    share_code = request.form.get('shareCode', '').strip()

    # 2. More input validation: Check if a file was actually selected
    if file.filename == '':
        logger.warning("Uploaded file has no filename (empty selection).")
        return jsonify({"success": False, "error": "No file selected. Please choose a file to upload."}), 400
    
    # 3. Validate the share code format (must be 4 digits and numeric)
    if not share_code or not share_code.isdigit() or len(share_code) != 4:
        logger.warning(f"Invalid share code provided by client: '{share_code}'.")
        return jsonify({"success": False, "error": "Please enter a valid 4-digit numeric Share Code."}), 400

    try:
        # 4. Read the content of the uploaded file into memory as bytes
        file_content_bytes = file.read()
        
        # 5. Call the helper function to process the Aadhaar XML
        result = process_aadhaar_xml(file_content_bytes, share_code)
        
        # 6. Return a JSON response to the frontend based on the processing result
        if result["success"]:
            logger.info("Aadhaar XML processed successfully and data returned to client.")
            return jsonify(result), 200 # HTTP 200 OK for success
        else:
            logger.error(f"Aadhaar XML processing failed with error: {result['error']}. Returning error to client.")
            # Use 400 (Bad Request) for client-side errors (e.g., wrong password, bad file)
            # Default to 400 if the helper function didn't specify a status_code
            status_code = result.get('status_code', 400) 
            return jsonify({"success": False, "error": result["error"]}), status_code

    except Exception as e:
        # Catch any unexpected errors that might occur during the file upload or initial checks in this route
        logger.exception("An unexpected error occurred in the /verify-aadhaar route during file handling.")
        return jsonify({"success": False, "error": f"An unexpected server error occurred during file upload: {e}"}), 500 # HTTP 500 for server-side errors

# --- Main Execution Block ---
# This block runs when you execute 'python app.py'
if __name__ == '__main__':
    logger.info("Starting Flask app...")
    # app.run() starts the Flask development server.
    # debug=True enables auto-reloading and helpful debug messages.
    # port=5000 sets the port the server listens on.
    app.run(debug=True, port=5000)
    logger.info("Flask app terminated.")
