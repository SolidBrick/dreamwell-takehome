import sys
import json
from function.getBrandDescriptionAndProducts import describe_brand

if __name__ == "__main__":
    # Read JSON payload from Appwrite
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    # Call submodule function
    result = describe_brand(data.get("brand"))
    print(json.dumps({"result": result}))
