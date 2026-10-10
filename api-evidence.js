// 自动生成的文档快照；更新方式见 README，不代表业务验收。
const apiEvidence = {
  "captured_at": "2026-10-10",
  "sources": {
    "upms": {
      "document_path": "/v3/api-docs/upms",
      "sha256": "259baaec1c71707209308230f8e38f88a275b1d0a44d3c259b40169ddd28cd4c"
    },
    "default": {
      "document_path": "/v3/api-docs/default",
      "sha256": "65886094da6d0bbfe2ed81feb83413a71cee87c024441f69953402a3629841b2"
    }
  },
  "operations": {
    "POST /app/subjects/pet": {
      "method": "POST",
      "path": "/app/subjects/pet",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_createPet",
      "summary": "Create pet",
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateSubjectRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RPetSubjectVO"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects/pet/{petId}/shares": {
      "method": "GET",
      "path": "/app/subjects/pet/{petId}/shares",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_listPetShares",
      "summary": "List pet shares",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListShareGrantEntity"
              }
            }
          }
        }
      }
    },
    "POST /app/subjects/pet/{petId}/shares": {
      "method": "POST",
      "path": "/app/subjects/pet/{petId}/shares",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_createPetShare",
      "summary": "Create pet share",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateShareRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RShareGrantEntity"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects/pet/{petId}/device-bindings": {
      "method": "GET",
      "path": "/app/subjects/pet/{petId}/device-bindings",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_listPetBindings",
      "summary": "List pet device bindings",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListDeviceBindingEntity"
              }
            }
          }
        }
      }
    },
    "POST /app/subjects/pet/{petId}/device-bindings": {
      "method": "POST",
      "path": "/app/subjects/pet/{petId}/device-bindings",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_bindPetDevice",
      "summary": "Bind device to pet",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "deviceId",
          "in": "query",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RDeviceBindingEntity"
              }
            }
          }
        }
      }
    },
    "POST /app/subjects/person": {
      "method": "POST",
      "path": "/app/subjects/person",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_createPerson",
      "summary": "Create person",
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateSubjectRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RPersonSubjectVO"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects/person/{personId}/shares": {
      "method": "GET",
      "path": "/app/subjects/person/{personId}/shares",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_listPersonShares",
      "summary": "List person shares",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListShareGrantEntity"
              }
            }
          }
        }
      }
    },
    "POST /app/subjects/person/{personId}/shares": {
      "method": "POST",
      "path": "/app/subjects/person/{personId}/shares",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_createPersonShare",
      "summary": "Create person share",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateShareRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RShareGrantEntity"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects/person/{personId}/device-bindings": {
      "method": "GET",
      "path": "/app/subjects/person/{personId}/device-bindings",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_listPersonBindings",
      "summary": "List person device bindings",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListDeviceBindingEntity"
              }
            }
          }
        }
      }
    },
    "POST /app/subjects/person/{personId}/device-bindings": {
      "method": "POST",
      "path": "/app/subjects/person/{personId}/device-bindings",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_bindPersonDevice",
      "summary": "Bind device to person",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "deviceId",
          "in": "query",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RDeviceBindingEntity"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{deviceId}/shares": {
      "method": "GET",
      "path": "/app/device/{deviceId}/shares",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_listShares",
      "summary": "List device shares",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListShareGrantEntity"
              }
            }
          }
        }
      }
    },
    "POST /app/device/{deviceId}/shares": {
      "method": "POST",
      "path": "/app/device/{deviceId}/shares",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_createShare",
      "summary": "Create device share",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/CreateShareRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RShareGrantEntity"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{deviceId}/property": {
      "method": "GET",
      "path": "/app/device/{deviceId}/property",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_getProperty",
      "summary": "Read device property",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "property",
          "in": "query",
          "required": true,
          "description": "属性名称",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "POST /app/device/{deviceId}/property": {
      "method": "POST",
      "path": "/app/device/{deviceId}/property",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_writeProperties",
      "summary": "Write device properties",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "POST /app/device/{deviceId}/function": {
      "method": "POST",
      "path": "/app/device/{deviceId}/function",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_invokeFunction",
      "summary": "Invoke device function",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "functionId",
          "in": "query",
          "required": true,
          "description": "功能ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "POST /app/device/{deviceId}/app-location": {
      "method": "POST",
      "path": "/app/device/{deviceId}/app-location",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_reportAppLocation",
      "summary": "Report app location",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/TrackerAppLocation"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "POST /app/device/{deviceId}/alarm-state": {
      "method": "POST",
      "path": "/app/device/{deviceId}/alarm-state",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_reportAlarmState",
      "summary": "Report alarm state",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "timestamp",
          "in": "query",
          "required": true,
          "description": "告警时间戳（毫秒）",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "state",
          "in": "query",
          "required": true,
          "description": "告警状态: UNREAD / READ / IMPORTANT",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "POST /app/device/unbind-devices": {
      "method": "POST",
      "path": "/app/device/unbind-devices",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_unbindSelfDevices",
      "summary": "Unbind own devices",
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RInteger"
              }
            }
          }
        }
      }
    },
    "POST /app/device/bind": {
      "method": "POST",
      "path": "/app/device/bind",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_bind",
      "summary": "Bind device",
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/DeviceBindRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "POST /app/device/bind/{id}/switch-product": {
      "method": "POST",
      "path": "/app/device/bind/{id}/switch-product",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_switchProduct",
      "summary": "Switch device product",
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "description": "绑定记录ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "newProductKey",
          "in": "query",
          "required": true,
          "description": "新产品Key",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "POST /app/device/bind-self": {
      "method": "POST",
      "path": "/app/device/bind-self",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_bindSelf",
      "summary": "Bind device to self",
      "parameters": [
        {
          "name": "deviceId",
          "in": "query",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects/pet/{petId}": {
      "method": "GET",
      "path": "/app/subjects/pet/{petId}",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_getPet",
      "summary": "Get pet detail",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RPetSubjectVO"
              }
            }
          }
        }
      }
    },
    "PATCH /app/subjects/pet/{petId}": {
      "method": "PATCH",
      "path": "/app/subjects/pet/{petId}",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_updatePet",
      "summary": "Update pet",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdatePetRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects/person/{personId}": {
      "method": "GET",
      "path": "/app/subjects/person/{personId}",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_getPerson",
      "summary": "Get person detail",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RPersonSubjectVO"
              }
            }
          }
        }
      }
    },
    "PATCH /app/subjects/person/{personId}": {
      "method": "PATCH",
      "path": "/app/subjects/person/{personId}",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_updatePerson",
      "summary": "Update person",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UpdatePersonRequest"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "GET /app/subjects": {
      "method": "GET",
      "path": "/app/subjects",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_listSubjects",
      "summary": "List all subjects",
      "parameters": [],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListSubjectVO"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{manufacturer}/{brand}/product": {
      "method": "GET",
      "path": "/app/device/{manufacturer}/{brand}/product",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_resolveProduct",
      "summary": "Validate before binding and get product key",
      "parameters": [
        {
          "name": "manufacturer",
          "in": "path",
          "required": true,
          "description": "设备厂家",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "brand",
          "in": "path",
          "required": true,
          "description": "品牌",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "deviceName",
          "in": "query",
          "required": false,
          "description": "型号",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "fwVersion",
          "in": "query",
          "required": false,
          "description": "固件版本",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RString"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{deviceId}/state": {
      "method": "GET",
      "path": "/app/device/{deviceId}/state",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_getDeviceState",
      "summary": "Get device state",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/REnumInfoString"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{deviceId}/realtime": {
      "method": "GET",
      "path": "/app/device/{deviceId}/realtime",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_getRealtime",
      "summary": "Get realtime data",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RTrackerRealTime"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{deviceId}/product": {
      "method": "GET",
      "path": "/app/device/{deviceId}/product",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_getDeviceProduct",
      "summary": "Get device product",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RProductVO"
              }
            }
          }
        }
      }
    },
    "GET /app/device/{deviceId}/events": {
      "method": "GET",
      "path": "/app/device/{deviceId}/events",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_queryEvents",
      "summary": "Query device events",
      "parameters": [
        {
          "name": "deviceId",
          "in": "path",
          "required": true,
          "description": "设备ID",
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "eventId",
          "in": "query",
          "required": true,
          "description": "事件ID",
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "GET /app/device/targets": {
      "method": "GET",
      "path": "/app/device/targets",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_getBindingTargets",
      "summary": "Get binding targets",
      "parameters": [],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBindingTargetsVO"
              }
            }
          }
        }
      }
    },
    "GET /app/device/products": {
      "method": "GET",
      "path": "/app/device/products",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_listProducts",
      "summary": "List available products",
      "parameters": [],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListProductVO"
              }
            }
          }
        }
      }
    },
    "GET /app/device/bindings": {
      "method": "GET",
      "path": "/app/device/bindings",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_listBindings",
      "summary": "List bindings",
      "parameters": [
        {
          "name": "bindType",
          "in": "query",
          "required": true,
          "description": "绑定类型: PERSON / PET / SPACE",
          "schema": {
            "type": "string",
            "enum": [
              "PERSON",
              "PET",
              "SPACE"
            ]
          }
        },
        {
          "name": "bindToId",
          "in": "query",
          "required": true,
          "description": "绑定目标ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RListDeviceBindingEntity"
              }
            }
          }
        }
      }
    },
    "DELETE /app/subjects/pet/{petId}/device-bindings/{bindingId}": {
      "method": "DELETE",
      "path": "/app/subjects/pet/{petId}/device-bindings/{bindingId}",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_unbindPetDevice",
      "summary": "Unbind pet device",
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "required": true,
          "description": "宠物ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "bindingId",
          "in": "path",
          "required": true,
          "description": "绑定关系ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "DELETE /app/subjects/person/{personId}/device-bindings/{bindingId}": {
      "method": "DELETE",
      "path": "/app/subjects/person/{personId}/device-bindings/{bindingId}",
      "group": "upms",
      "tags": [
        "App Subject"
      ],
      "operation_id": "AppSubjectController_unbindPersonDevice",
      "summary": "Unbind person device",
      "parameters": [
        {
          "name": "personId",
          "in": "path",
          "required": true,
          "description": "人员ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "bindingId",
          "in": "path",
          "required": true,
          "description": "绑定关系ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "DELETE /app/device/bind/{id}": {
      "method": "DELETE",
      "path": "/app/device/bind/{id}",
      "group": "upms",
      "tags": [
        "App Device"
      ],
      "operation_id": "AppDeviceController_unbind",
      "summary": "Unbind device",
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "description": "绑定关系ID",
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RObject"
              }
            }
          }
        }
      }
    },
    "PUT /user/personal/edit": {
      "method": "PUT",
      "path": "/user/personal/edit",
      "group": "default",
      "tags": [
        "用户管理模块"
      ],
      "operation_id": "SysUserController_updateUserInfo",
      "summary": null,
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UserDTO"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "POST /sys-file/upload": {
      "method": "POST",
      "path": "/sys-file/upload",
      "group": "default",
      "tags": [
        "文件管理"
      ],
      "operation_id": "SysFileController_upload",
      "summary": null,
      "parameters": [
        {
          "name": "dir",
          "in": "query",
          "required": false,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "groupId",
          "in": "query",
          "required": false,
          "schema": {
            "type": "integer",
            "format": "int64"
          }
        },
        {
          "name": "type",
          "in": "query",
          "required": false,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "fileName",
          "in": "query",
          "required": false,
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "file": {
                  "type": "string",
                  "format": "binary"
                }
              },
              "required": [
                "file"
              ]
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RMapStringString"
              }
            }
          }
        }
      }
    },
    "POST /register/user": {
      "method": "POST",
      "path": "/register/user",
      "group": "default",
      "tags": [
        "sys-register-controller"
      ],
      "operation_id": "SysRegisterController_registerUser",
      "summary": null,
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/RegisterUserDTO"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "POST /register/password": {
      "method": "POST",
      "path": "/register/password",
      "group": "default",
      "tags": [
        "sys-register-controller"
      ],
      "operation_id": "SysRegisterController_resetUserPassword",
      "summary": null,
      "parameters": [],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/RegisterUserDTO"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "POST /register/forget/{code}": {
      "method": "POST",
      "path": "/register/forget/{code}",
      "group": "default",
      "tags": [
        "sys-register-controller"
      ],
      "operation_id": "SysRegisterController_forgetUserPassword",
      "summary": null,
      "parameters": [
        {
          "name": "code",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/RegisterUserDTO"
            }
          }
        }
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    },
    "GET /user/info": {
      "method": "GET",
      "path": "/user/info",
      "group": "default",
      "tags": [
        "用户管理模块"
      ],
      "operation_id": "SysUserController_info",
      "summary": null,
      "parameters": [],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RUserInfo"
              }
            }
          }
        }
      }
    },
    "GET /sysMessage/send/app/emailCode": {
      "method": "GET",
      "path": "/sysMessage/send/app/emailCode",
      "group": "default",
      "tags": [
        "站内信息管理"
      ],
      "operation_id": "SysMessageController_sendAppEmailCode",
      "summary": null,
      "parameters": [
        {
          "name": "email",
          "in": "query",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "registered",
          "in": "query",
          "required": false,
          "schema": {
            "type": "boolean"
          }
        },
        {
          "name": "App-Client-Id",
          "in": "header",
          "required": false,
          "schema": {
            "type": "string"
          }
        }
      ],
      "request_body": {
        "content": {}
      },
      "responses": {
        "500": {
          "description": "Internal Server Error",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "403": {
          "description": "Forbidden",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "400": {
          "description": "Bad Request",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "413": {
          "description": "Content Too Large",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/R"
              }
            }
          }
        },
        "200": {
          "description": "OK",
          "content": {
            "*/*": {
              "schema": {
                "$ref": "#/components/schemas/RBoolean"
              }
            }
          }
        }
      }
    }
  },
  "schemas": {
    "upms": {
      "RListDeviceBindingEntity": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "array",
            "description": "数据",
            "items": {
              "$ref": "#/components/schemas/DeviceBindingEntity"
            }
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RBoolean": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "boolean",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RPersonSubjectVO": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/PersonSubjectVO",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RInteger": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "integer",
            "format": "int32",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "TrackerAppLocation": {
        "type": "object",
        "properties": {
          "dateTime": {
            "type": "integer",
            "format": "int64"
          },
          "statusCode": {
            "type": "integer",
            "format": "int64"
          },
          "lat": {
            "type": "number",
            "format": "double",
            "description": "Latitude"
          },
          "lng": {
            "type": "number",
            "format": "double",
            "description": "Longitude"
          },
          "radius": {
            "type": "number",
            "format": "double"
          },
          "source": {
            "type": "integer",
            "format": "int32"
          },
          "locStatus": {
            "type": "string",
            "description": "LocStatus",
            "enum": [
              "x"
            ]
          }
        }
      },
      "PersonSubjectVO": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SubjectVO"
          },
          {
            "type": "object",
            "properties": {
              "profile": {
                "$ref": "#/components/schemas/PersonProfile",
                "description": "人员档案"
              }
            }
          }
        ],
        "description": "人员视图"
      },
      "RTrackerRealTime": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/TrackerRealTime",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RListSubjectVO": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "array",
            "description": "数据",
            "items": {
              "oneOf": [
                {
                  "$ref": "#/components/schemas/SubjectVO"
                },
                {
                  "$ref": "#/components/schemas/PersonSubjectVO"
                },
                {
                  "$ref": "#/components/schemas/PetSubjectVO"
                }
              ]
            }
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "REnumInfoString": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/EnumInfoString",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RProductVO": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/ProductVO",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "UpdatePetRequest": {
        "type": "object",
        "description": "更新宠物请求",
        "properties": {
          "displayName": {
            "type": "string",
            "description": "展示名称"
          },
          "avatarUrl": {
            "type": "string",
            "description": "头像URL"
          },
          "status": {
            "type": "string",
            "description": "状态: ACTIVE / ARCHIVED"
          },
          "species": {
            "type": "string",
            "description": "物种: DOG / CAT / OTHER"
          },
          "breed": {
            "type": "string",
            "description": "品种"
          },
          "gender": {
            "type": "string",
            "description": "性别: MALE / FEMALE / UNKNOWN"
          },
          "neutered": {
            "type": "integer",
            "format": "int32",
            "description": "是否绝育: 0=否, 1=是"
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "description": "出生日期"
          },
          "weight": {
            "type": "number",
            "format": "double",
            "description": "体重(kg)"
          },
          "activityTargetMinutes": {
            "type": "integer",
            "format": "int32",
            "description": "每日活动目标(分钟)"
          }
        }
      },
      "TrackerRealTime": {
        "type": "object",
        "properties": {
          "isChina": {
            "type": "boolean"
          },
          "generalData": {
            "$ref": "#/components/schemas/GeneralData"
          },
          "latestLocation": {
            "$ref": "#/components/schemas/LatestLocation"
          },
          "expands": {
            "type": "object",
            "additionalProperties": {}
          }
        }
      },
      "R": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "PetSubjectVO": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SubjectVO"
          },
          {
            "type": "object",
            "properties": {
              "profile": {
                "$ref": "#/components/schemas/PetProfile",
                "description": "宠物档案"
              }
            }
          }
        ],
        "description": "宠物视图"
      },
      "CreateShareRequest": {
        "type": "object",
        "description": "创建分享授权请求",
        "properties": {
          "granteeUserId": {
            "type": "integer",
            "format": "int64",
            "description": "接受方用户ID（已注册用户）"
          },
          "inviteAccount": {
            "type": "string",
            "description": "邀请账号（邮箱或手机号，未注册用户）"
          },
          "role": {
            "type": "string",
            "description": "分享角色: OWNER / MANAGER / ALERT_RECEIVER / VIEWER",
            "minLength": 1
          },
          "scopes": {
            "type": "array",
            "description": "权限范围: 1-LOCATION(位置) / 2-TRACK(轨迹) / 3-ALERT(告警) / 4-PUSH(推送) / 5-PROFILE(资料) / 6-HEALTH(健康) / 7-GEOFENCE(围栏) / 8-CONFIG(配置) / 9-COMMAND(指令) / 10-SHARE(分享)",
            "items": {
              "type": "string",
              "enum": [
                "LOCATION",
                "TRACK",
                "ALERT",
                "PUSH",
                "PROFILE",
                "HEALTH",
                "GEOFENCE",
                "CONFIG",
                "COMMAND",
                "SHARE"
              ]
            }
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "过期时间，空表示长期有效"
          }
        },
        "required": [
          "role",
          "scopes"
        ]
      },
      "LatestLocation": {
        "type": "object",
        "properties": {
          "lat": {
            "type": "number",
            "format": "double",
            "description": "Latitude"
          },
          "lng": {
            "type": "number",
            "format": "double",
            "description": "Longitude"
          },
          "radius": {
            "type": "number",
            "format": "double"
          },
          "dateTime": {
            "type": "integer",
            "format": "int64"
          },
          "alarmTime": {
            "type": "integer",
            "format": "int64",
            "description": "alarm time"
          },
          "alarmCode": {
            "type": "integer",
            "format": "int64",
            "description": "alarm code"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "dataType": {
            "type": "integer",
            "format": "int32"
          },
          "describe": {
            "type": "string"
          },
          "locStatus": {
            "type": "string",
            "description": "location status, default null",
            "enum": [
              "x"
            ]
          }
        }
      },
      "RBindingTargetsVO": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/BindingTargetsVO",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RPetSubjectVO": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/PetSubjectVO",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "CreateSubjectRequest": {
        "type": "object",
        "description": "创建业务对象请求",
        "properties": {
          "type": {
            "type": "string",
            "description": "类型: PERSON / PET / VEHICLE / OBJECT",
            "minLength": 1
          },
          "displayName": {
            "type": "string",
            "description": "展示名称",
            "minLength": 1
          },
          "avatarUrl": {
            "type": "string",
            "description": "头像URL"
          },
          "profile": {
            "type": "object",
            "additionalProperties": {},
            "description": "分类Profile字段，键值随 type 变化。PERSON: relationToOwner, gender, birthDate, heightCm, weightKg, healthMonitoringEnabled, remark. PET: species, breed, gender, neutered, birthDate, weightKg, activityTargetMinutes, remark."
          }
        },
        "required": [
          "displayName",
          "type"
        ]
      },
      "RString": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "string",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RDeviceBindingEntity": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/DeviceBindingEntity",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RShareGrantEntity": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/ShareGrantEntity",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RListShareGrantEntity": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "array",
            "description": "数据",
            "items": {
              "$ref": "#/components/schemas/ShareGrantEntity"
            }
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "UpdatePersonRequest": {
        "type": "object",
        "description": "更新人员请求",
        "properties": {
          "displayName": {
            "type": "string",
            "description": "展示名称"
          },
          "avatarUrl": {
            "type": "string",
            "description": "头像URL"
          },
          "status": {
            "type": "string",
            "description": "状态: ACTIVE / ARCHIVED"
          },
          "relationToOwner": {
            "type": "string",
            "description": "与户主关系"
          },
          "gender": {
            "type": "string",
            "description": "性别: MALE / FEMALE / UNKNOWN"
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "description": "出生日期"
          },
          "height": {
            "type": "number",
            "format": "double",
            "description": "身高(cm)"
          },
          "weight": {
            "type": "number",
            "format": "double",
            "description": "体重(kg)"
          },
          "healthMonitoringEnabled": {
            "type": "boolean",
            "description": "是否启用健康监测"
          }
        }
      },
      "SubjectVO": {
        "type": "object",
        "description": "业务对象视图",
        "properties": {
          "id": {
            "type": "string",
            "description": "全局唯一ID，格式: PERSON:1 / PET:2"
          },
          "bindType": {
            "type": "string",
            "description": "绑定目标类型: PERSON / PET / SPACE",
            "enum": [
              "PERSON",
              "PET",
              "SPACE"
            ]
          },
          "displayName": {
            "type": "string",
            "description": "展示名称"
          },
          "avatarUrl": {
            "type": "string",
            "description": "头像URL"
          },
          "userId": {
            "type": "integer",
            "format": "int64",
            "description": "所属用户ID"
          },
          "status": {
            "type": "string",
            "description": "状态: ACTIVE / ARCHIVED",
            "enum": [
              "ACTIVE",
              "ARCHIVED"
            ]
          },
          "primaryDeviceId": {
            "type": "string",
            "description": "主设备ID"
          },
          "remark": {
            "type": "string",
            "description": "备注"
          },
          "tags": {
            "type": "array",
            "description": "业务标签",
            "items": {
              "type": "string"
            }
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "更新时间"
          }
        }
      },
      "PersonProfile": {
        "type": "object",
        "description": "人员档案",
        "properties": {
          "relationToOwner": {
            "type": "string",
            "description": "与户主关系"
          },
          "gender": {
            "type": "string",
            "description": "性别: 1-MALE(男) / 2-FEMALE(女) / 3-UNKNOWN(未知)",
            "enum": [
              "MALE",
              "FEMALE",
              "UNKNOWN"
            ]
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "description": "出生日期"
          },
          "height": {
            "type": "number",
            "format": "double",
            "description": "身高(cm)"
          },
          "weight": {
            "type": "number",
            "format": "double",
            "description": "体重(kg)"
          },
          "healthMonitoringEnabled": {
            "type": "boolean",
            "description": "是否启用健康监测"
          }
        }
      },
      "RListProductVO": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "array",
            "description": "数据",
            "items": {
              "$ref": "#/components/schemas/ProductVO"
            }
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "DeviceBindRequest": {
        "type": "object",
        "description": "设备绑定请求",
        "properties": {
          "bindType": {
            "type": "string",
            "description": "绑定类型: PERSON / PET / SPACE",
            "enum": [
              "PERSON",
              "PET",
              "SPACE"
            ]
          },
          "bindToId": {
            "type": "integer",
            "format": "int64",
            "description": "绑定目标ID(人员/宠物/空间)"
          },
          "deviceId": {
            "type": "string",
            "description": "Loctube设备ID",
            "minLength": 1
          },
          "productKey": {
            "type": "string",
            "description": "产品Key，App界面选择的产品类型。若设备已在Loctube存在则选填，否则必填"
          }
        },
        "required": [
          "bindToId",
          "bindType",
          "deviceId"
        ]
      },
      "ShareGrantEntity": {
        "type": "object",
        "description": "分享授权表",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "description": "主键"
          },
          "resourceType": {
            "type": "string",
            "description": "资源类型: 1-DEVICE(设备) / 2-PERSON(人员) / 3-PET(宠物)",
            "enum": [
              "DEVICE",
              "PERSON",
              "PET"
            ]
          },
          "resourceId": {
            "type": "string",
            "description": "资源ID",
            "minLength": 1
          },
          "grantorUserId": {
            "type": "integer",
            "format": "int64",
            "description": "发起方用户ID"
          },
          "granteeUserId": {
            "type": "integer",
            "format": "int64",
            "description": "接受方用户ID"
          },
          "role": {
            "type": "string",
            "description": "分享角色: 1-OWNER(所有者) / 2-MANAGER(管理者) / 3-VIEWER(查看者)",
            "enum": [
              "OWNER",
              "MANAGER",
              "VIEWER"
            ]
          },
          "scopes": {
            "type": "array",
            "description": "权限集合: 1-LOCATION(位置) / 2-TRACK(轨迹) / 3-ALERT(告警) / 4-PUSH(推送) / 5-PROFILE(资料) / 6-HEALTH(健康) / 7-GEOFENCE(围栏) / 8-CONFIG(配置) / 9-COMMAND(指令) / 10-SHARE(分享)",
            "items": {
              "type": "string",
              "enum": [
                "LOCATION",
                "TRACK",
                "ALERT",
                "PUSH",
                "PROFILE",
                "HEALTH",
                "GEOFENCE",
                "CONFIG",
                "COMMAND",
                "SHARE"
              ]
            }
          },
          "status": {
            "type": "string",
            "description": "状态: 1-PENDING(待接受) / 2-ACCEPTED(已接受) / 3-REVOKED(已撤销)",
            "enum": [
              "PENDING",
              "ACCEPTED",
              "REVOKED"
            ]
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "过期时间"
          },
          "acceptedAt": {
            "type": "string",
            "format": "date-time",
            "description": "接受时间"
          },
          "revokedAt": {
            "type": "string",
            "format": "date-time",
            "description": "撤销时间"
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateBy": {
            "type": "string",
            "description": "更新人"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "更新时间"
          }
        },
        "required": [
          "granteeUserId",
          "grantorUserId",
          "resourceId",
          "resourceType",
          "role",
          "scopes",
          "status"
        ]
      },
      "PetProfile": {
        "type": "object",
        "description": "宠物档案",
        "properties": {
          "species": {
            "type": "string",
            "description": "物种: 1-DOG(狗) / 2-CAT(猫) / 3-OTHER(其他)",
            "enum": [
              "DOG",
              "CAT",
              "OTHER"
            ]
          },
          "breed": {
            "type": "string",
            "description": "品种"
          },
          "gender": {
            "type": "string",
            "description": "性别: 1-MALE(公) / 2-FEMALE(母) / 3-UNKNOWN(未知)",
            "enum": [
              "MALE",
              "FEMALE",
              "UNKNOWN"
            ]
          },
          "neutered": {
            "type": "integer",
            "format": "int32",
            "description": "是否绝育: 0=未绝育, 1=已绝育"
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "description": "出生日期"
          },
          "weight": {
            "type": "number",
            "format": "double",
            "description": "体重(kg)"
          },
          "activityTargetMinutes": {
            "type": "integer",
            "format": "int32",
            "description": "每日活动目标(分钟)"
          }
        }
      },
      "RObject": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "DeviceBindingEntity": {
        "type": "object",
        "description": "设备绑定表",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "description": "主键"
          },
          "bindType": {
            "type": "string",
            "description": "绑定目标类型: 1-PERSON(人员) / 2-PET(宠物) / 3-SPACE(空间)",
            "enum": [
              "PERSON",
              "PET",
              "SPACE"
            ]
          },
          "bindToId": {
            "type": "integer",
            "format": "int64",
            "description": "绑定目标ID(人员/宠物/空间)"
          },
          "deviceId": {
            "type": "string",
            "description": "设备ID",
            "minLength": 1
          },
          "productKey": {
            "type": "string",
            "description": "绑定时所选产品Key"
          },
          "boundAt": {
            "type": "string",
            "format": "date-time",
            "description": "绑定时间"
          },
          "source": {
            "type": "string",
            "description": "来源: 1-EVMARS(本地系统) / 2-KATCHU_MIGRATION(老系统迁移)",
            "enum": [
              "EVMARS",
              "KATCHU_MIGRATION"
            ]
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateBy": {
            "type": "string",
            "description": "更新人"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "更新时间"
          }
        },
        "required": [
          "bindToId",
          "bindType",
          "deviceId"
        ]
      },
      "EnumInfoString": {
        "type": "object",
        "properties": {
          "text": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      },
      "GeneralData": {
        "type": "object",
        "description": "general data",
        "properties": {
          "dataType": {
            "type": "integer",
            "format": "int32"
          },
          "isGPS": {
            "type": "boolean",
            "description": "GPS"
          },
          "isWIFI": {
            "type": "boolean",
            "description": "Wi-Fi Source"
          },
          "isGSM": {
            "type": "boolean",
            "description": "Cell Tower"
          },
          "isBLE": {
            "type": "boolean",
            "description": "BLE Location"
          },
          "isCharging": {
            "type": "boolean",
            "description": "In-Charging"
          },
          "isChargingComplete": {
            "type": "boolean",
            "description": "Fully Charged"
          },
          "isReboot": {
            "type": "boolean",
            "description": "Reboot"
          },
          "isHistoricalData": {
            "type": "boolean",
            "description": "Historical Data"
          },
          "isAGPS": {
            "type": "boolean",
            "description": "AGPS Data Valid"
          },
          "isMotion": {
            "type": "boolean",
            "description": "Motion"
          },
          "isSmart": {
            "type": "boolean",
            "description": "Smart Locating"
          },
          "isHomeBeacon": {
            "type": "boolean",
            "description": "Home Beacon location"
          },
          "bleConnected": {
            "type": "boolean",
            "description": "BLE Connected"
          },
          "fallDownStatus": {
            "type": "boolean",
            "description": "Fall down allow on status (1:open ,0:close)(EC03 Only)"
          },
          "isHomeWifi": {
            "type": "boolean",
            "description": "Home wifi location"
          },
          "isHome": {
            "type": "boolean",
            "description": "Indoor (0:outdoor 1:indoor)"
          },
          "workMode": {
            "type": "integer",
            "format": "int32",
            "description": "Work Mode"
          },
          "signalSize": {
            "type": "integer",
            "format": "int32",
            "description": "Cell Network Signal Strength"
          },
          "battery": {
            "type": "integer",
            "format": "int32",
            "description": "Battery Level",
            "maximum": 100,
            "minimum": 0
          },
          "mobileNetworkType": {
            "type": "integer",
            "format": "int32",
            "description": "0-no service\n1-2G\n2-3G\n4G"
          },
          "wifiConnected": {
            "type": "boolean",
            "description": "WIFI connected (CTM:EV04)"
          },
          "wifiUpload": {
            "type": "boolean",
            "description": "WIFI upload (CTM: EV04)"
          },
          "volte": {
            "type": "boolean",
            "description": "OK Status (Reserve bit)\n1:Registered\n0:Not Registered"
          },
          "calling": {
            "type": "boolean",
            "description": "Calling status (EV06 0122 Only)"
          },
          "isBeacon": {
            "type": "boolean",
            "description": "Beacon location"
          },
          "isLoRa": {
            "type": "boolean",
            "description": "LoRA location (CTM: EV12 3104)"
          },
          "poweredDischarging": {
            "type": "boolean",
            "description": "Powered Discharging"
          },
          "dateTime": {
            "type": "integer",
            "format": "int64",
            "description": "Epoch & Unix Timestamp. 4 bytes"
          },
          "statusCode": {
            "type": "integer",
            "format": "int64",
            "description": "Status of device. 4 bytes"
          },
          "statusCode2": {
            "type": "integer",
            "format": "int64",
            "description": "Extend Status of device. 4 bytes"
          }
        }
      },
      "ProductVO": {
        "type": "object",
        "description": "产品选项",
        "properties": {
          "productKey": {
            "type": "string",
            "description": "产品Key"
          },
          "productName": {
            "type": "string",
            "description": "产品名称"
          },
          "sort": {
            "type": "integer",
            "format": "int32",
            "description": "排序"
          }
        }
      },
      "BindingTargetsVO": {
        "type": "object",
        "description": "设备绑定目标列表",
        "properties": {
          "persons": {
            "type": "array",
            "description": "人员列表",
            "items": {
              "$ref": "#/components/schemas/PersonEntity"
            }
          },
          "pets": {
            "type": "array",
            "description": "宠物列表",
            "items": {
              "$ref": "#/components/schemas/PetEntity"
            }
          }
        }
      },
      "PetEntity": {
        "type": "object",
        "description": "宠物表",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "description": "主键"
          },
          "userId": {
            "type": "integer",
            "format": "int64",
            "description": "所属账号"
          },
          "displayName": {
            "type": "string",
            "description": "展示名称",
            "minLength": 1
          },
          "avatarUrl": {
            "type": "string",
            "description": "头像"
          },
          "species": {
            "type": "string",
            "description": "物种: 1-DOG(狗) / 2-CAT(猫) / 3-OTHER(其他)",
            "enum": [
              "DOG",
              "CAT",
              "OTHER"
            ]
          },
          "breed": {
            "type": "string",
            "description": "品种"
          },
          "gender": {
            "type": "string",
            "description": "性别: 1-MALE(公) / 2-FEMALE(母) / 3-UNKNOWN(未知)",
            "enum": [
              "MALE",
              "FEMALE",
              "UNKNOWN"
            ]
          },
          "neutered": {
            "type": "integer",
            "format": "int32",
            "description": "是否绝育: 0=未绝育, 1=已绝育"
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "description": "出生日期"
          },
          "weight": {
            "type": "number",
            "format": "double",
            "description": "体重"
          },
          "weightUnit": {
            "type": "string",
            "description": "体重单位"
          },
          "activityTargetMinutes": {
            "type": "integer",
            "format": "int32",
            "description": "每日活动目标(分钟)"
          },
          "remark": {
            "type": "string",
            "description": "备注"
          },
          "tags": {
            "type": "array",
            "description": "业务标签",
            "items": {
              "type": "string"
            }
          },
          "expands": {
            "type": "string",
            "description": "拓展信息"
          },
          "primaryDeviceId": {
            "type": "string",
            "description": "主设备ID"
          },
          "status": {
            "type": "string",
            "description": "状态: 1-ACTIVE(启用) / 2-ARCHIVED(归档)",
            "enum": [
              "ACTIVE",
              "ARCHIVED"
            ]
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateBy": {
            "type": "string",
            "description": "更新人"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "更新时间"
          }
        },
        "required": [
          "displayName",
          "species",
          "userId"
        ]
      },
      "PersonEntity": {
        "type": "object",
        "description": "人员表",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64",
            "description": "主键"
          },
          "userId": {
            "type": "integer",
            "format": "int64",
            "description": "所属账号"
          },
          "displayName": {
            "type": "string",
            "description": "展示名称",
            "minLength": 1
          },
          "avatarUrl": {
            "type": "string",
            "description": "头像"
          },
          "relationToOwner": {
            "type": "string",
            "description": "与户主关系"
          },
          "gender": {
            "type": "string",
            "description": "性别: 1-MALE(男) / 2-FEMALE(女) / 3-UNKNOWN(未知)",
            "enum": [
              "MALE",
              "FEMALE",
              "UNKNOWN"
            ]
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "description": "出生日期"
          },
          "height": {
            "type": "number",
            "format": "double",
            "description": "身高"
          },
          "heightUnit": {
            "type": "string",
            "description": "身高单位"
          },
          "weight": {
            "type": "number",
            "format": "double",
            "description": "体重"
          },
          "weightUnit": {
            "type": "string",
            "description": "体重单位"
          },
          "healthMonitoringEnabled": {
            "type": "boolean",
            "description": "是否启用健康监测"
          },
          "remark": {
            "type": "string",
            "description": "看护备注"
          },
          "tags": {
            "type": "array",
            "description": "业务标签",
            "items": {
              "type": "string"
            }
          },
          "expands": {
            "type": "string",
            "description": "拓展信息"
          },
          "primaryDeviceId": {
            "type": "string",
            "description": "主设备ID"
          },
          "status": {
            "type": "string",
            "description": "状态: 1-ACTIVE(启用) / 2-ARCHIVED(归档)",
            "enum": [
              "ACTIVE",
              "ARCHIVED"
            ]
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateBy": {
            "type": "string",
            "description": "更新人"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "更新时间"
          }
        },
        "required": [
          "displayName",
          "userId"
        ]
      }
    },
    "default": {
      "RBoolean": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "boolean",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RegisterUserDTO": {
        "type": "object",
        "description": "注册用户",
        "properties": {
          "username": {
            "type": "string",
            "description": "用户名"
          },
          "password": {
            "type": "string",
            "description": "密码"
          },
          "newpassword1": {
            "type": "string",
            "description": "新密码"
          },
          "phone": {
            "type": "string",
            "description": "电话"
          },
          "email": {
            "type": "string",
            "description": "邮箱地址"
          },
          "tenantId": {
            "type": "integer",
            "format": "int64",
            "description": "租户ID"
          },
          "code": {
            "type": "string",
            "description": "短信/邮箱 验证码"
          },
          "loginType": {
            "type": "string",
            "enum": [
              "PWD",
              "SMS",
              "EMAIL",
              "APPSMS",
              "QQ",
              "WECHAT",
              "MINI_APP",
              "GITEE",
              "OSC",
              "DINGTALK",
              "WEIXIN_CP",
              "CAS",
              "GOOGLE"
            ]
          },
          "registerType": {
            "type": "string",
            "enum": [
              "EMAIL",
              "PHONE"
            ]
          }
        }
      },
      "RUserInfo": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "$ref": "#/components/schemas/UserInfo",
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "RMapStringString": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "UserDTO": {
        "type": "object",
        "description": "系统用户传输对象",
        "properties": {
          "userId": {
            "type": "integer",
            "format": "int64",
            "description": "主键id"
          },
          "username": {
            "type": "string",
            "description": "用户名"
          },
          "password": {
            "type": "string",
            "description": "密码"
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "updateBy": {
            "type": "string",
            "description": "修改人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "修改时间"
          },
          "delFlag": {
            "type": "string",
            "description": "删除标记,1:已删除,0:正常"
          },
          "lockFlag": {
            "type": "string",
            "description": "锁定标记"
          },
          "passwordExpireFlag": {
            "type": "string",
            "description": "密码过期标记"
          },
          "passwordModifyTime": {
            "type": "string",
            "format": "date-time",
            "description": "密码修改时间"
          },
          "phone": {
            "type": "string",
            "description": "手机号"
          },
          "avatar": {
            "type": "string",
            "description": "头像地址"
          },
          "tenantId": {
            "type": "integer",
            "format": "int64",
            "description": "用户所属租户id"
          },
          "deptId": {
            "type": "integer",
            "format": "int64",
            "description": "部门id"
          },
          "wxOpenid": {
            "type": "string",
            "description": "微信openid"
          },
          "wxCpUserid": {
            "type": "string",
            "description": "企微微信 userid"
          },
          "wxDingUserid": {
            "type": "string",
            "description": "钉钉 userid"
          },
          "googleUserid": {
            "type": "string",
            "description": "Google 用户唯一标识"
          },
          "miniOpenid": {
            "type": "string",
            "description": "微信小程序openid"
          },
          "qqOpenid": {
            "type": "string",
            "description": "QQ openid"
          },
          "giteeLogin": {
            "type": "string",
            "description": "码云唯一标识"
          },
          "oscId": {
            "type": "string",
            "description": "开源中国唯一标识"
          },
          "nickname": {
            "type": "string",
            "description": "昵称"
          },
          "name": {
            "type": "string",
            "description": "姓名"
          },
          "email": {
            "type": "string",
            "description": "邮箱"
          },
          "userType": {
            "type": "string",
            "description": "用户类型"
          },
          "syncTime": {
            "type": "string",
            "format": "date-time",
            "description": "最近同步时间"
          },
          "role": {
            "type": "array",
            "description": "角色id集合",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "deptIds": {
            "type": "array",
            "description": "部门id集合",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "post": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "newpassword1": {
            "type": "string",
            "description": "新密码"
          },
          "code": {
            "type": "string",
            "description": "验证码"
          }
        }
      },
      "R": {
        "type": "object",
        "description": "响应信息主体",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32",
            "description": "返回标记：成功标记=0，失败标记=1"
          },
          "msg": {
            "type": "string",
            "description": "返回信息"
          },
          "data": {
            "description": "数据"
          },
          "ok": {
            "type": "boolean",
            "readOnly": true
          }
        }
      },
      "UserInfo": {
        "type": "object",
        "description": "用户信息",
        "properties": {
          "userId": {
            "type": "integer",
            "format": "int64",
            "description": "主键"
          },
          "username": {
            "type": "string",
            "description": "用户名"
          },
          "password": {
            "type": "string"
          },
          "salt": {
            "type": "string"
          },
          "wxOpenid": {
            "type": "string",
            "description": "微信open id"
          },
          "qqOpenid": {
            "type": "string",
            "description": "qq open id"
          },
          "giteeOpenId": {
            "type": "string",
            "description": "gitee open id"
          },
          "oscOpenId": {
            "type": "string",
            "description": "开源中国 open id"
          },
          "wxCpUserid": {
            "type": "string",
            "description": "企微微信 userid"
          },
          "wxDingUserid": {
            "type": "string",
            "description": "钉钉 userid"
          },
          "googleUserid": {
            "type": "string",
            "description": "Google 用户唯一标识"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "修改时间"
          },
          "delFlag": {
            "type": "string",
            "description": "删除标记,1:已删除,0:正常"
          },
          "lockFlag": {
            "type": "string",
            "description": "锁定标记,0:正常,9:已锁定"
          },
          "passwordExpireFlag": {
            "type": "string",
            "description": "密码过期标记"
          },
          "passwordModifyTime": {
            "type": "string",
            "format": "date-time",
            "description": "密码修改时间"
          },
          "phone": {
            "type": "string",
            "description": "手机号"
          },
          "avatar": {
            "type": "string",
            "description": "头像"
          },
          "tenantId": {
            "type": "integer",
            "format": "int64",
            "description": "所属租户"
          },
          "deptId": {
            "type": "integer",
            "format": "int64",
            "description": "主部门id"
          },
          "deptList": {
            "type": "array",
            "description": "所属部门名称",
            "items": {
              "$ref": "#/components/schemas/SysDept"
            }
          },
          "roleList": {
            "type": "array",
            "description": "拥有的角色列表",
            "items": {
              "$ref": "#/components/schemas/SysRole"
            }
          },
          "postList": {
            "type": "array",
            "description": "拥有的岗位列表",
            "items": {
              "$ref": "#/components/schemas/SysPost"
            }
          },
          "nickname": {
            "type": "string",
            "description": "昵称"
          },
          "name": {
            "type": "string",
            "description": "姓名"
          },
          "email": {
            "type": "string",
            "description": "邮箱"
          },
          "permissions": {
            "type": "array",
            "description": "权限标识集合",
            "items": {
              "type": "string"
            }
          },
          "tenantName": {
            "type": "string",
            "description": "租户名称"
          }
        }
      },
      "SysDept": {
        "type": "object",
        "description": "部门",
        "properties": {
          "deptId": {
            "type": "integer",
            "format": "int64",
            "description": "部门id"
          },
          "name": {
            "type": "string",
            "description": "部门名称",
            "minLength": 1
          },
          "sortOrder": {
            "type": "integer",
            "format": "int32",
            "description": "排序值"
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "updateBy": {
            "type": "string",
            "description": "修改人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "修改时间"
          },
          "parentId": {
            "type": "integer",
            "format": "int64",
            "description": "父级部门id"
          },
          "delFlag": {
            "type": "string",
            "description": "删除标记,1:已删除,0:正常"
          },
          "syncTime": {
            "type": "string",
            "format": "date-time",
            "description": "最近同步时间"
          }
        },
        "required": [
          "name",
          "sortOrder"
        ]
      },
      "SysRole": {
        "type": "object",
        "description": "角色",
        "properties": {
          "roleId": {
            "type": "integer",
            "format": "int64",
            "description": "角色编号"
          },
          "roleName": {
            "type": "string",
            "description": "角色名称",
            "minLength": 1
          },
          "roleCode": {
            "type": "string",
            "description": "角色标识",
            "minLength": 1
          },
          "roleDesc": {
            "type": "string",
            "description": "角色描述"
          },
          "dsType": {
            "type": "integer",
            "format": "int32",
            "description": "数据权限类型"
          },
          "dsScope": {
            "type": "string",
            "description": "数据权限作用范围"
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "updateBy": {
            "type": "string",
            "description": "修改人"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "修改时间"
          },
          "delFlag": {
            "type": "string",
            "description": "删除标记,1:已删除,0:正常"
          }
        },
        "required": [
          "dsType",
          "roleCode",
          "roleName"
        ]
      },
      "SysPost": {
        "type": "object",
        "description": "岗位信息表",
        "properties": {
          "postId": {
            "type": "integer",
            "format": "int64",
            "description": "岗位ID"
          },
          "postCode": {
            "type": "string",
            "description": "岗位编码",
            "minLength": 1
          },
          "postName": {
            "type": "string",
            "description": "岗位名称",
            "minLength": 1
          },
          "postSort": {
            "type": "integer",
            "format": "int32",
            "description": "岗位排序"
          },
          "remark": {
            "type": "string",
            "description": "岗位描述"
          },
          "createBy": {
            "type": "string",
            "description": "创建人"
          },
          "updateBy": {
            "type": "string",
            "description": "修改人"
          },
          "delFlag": {
            "type": "string",
            "description": "是否删除  -1：已删除  0：正常"
          },
          "createTime": {
            "type": "string",
            "format": "date-time",
            "description": "创建时间"
          },
          "updateTime": {
            "type": "string",
            "format": "date-time",
            "description": "更新时间"
          }
        },
        "required": [
          "postCode",
          "postName",
          "postSort"
        ]
      }
    }
  }
};
