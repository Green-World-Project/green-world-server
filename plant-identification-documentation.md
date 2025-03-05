# Green World API Documentation

### Plant Identification Documentation

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# Plant Identification

## GET History

GET /user/history

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
[
    {
        "photo": "https://res.cloudinary.com/dtbrnazjf/image/upload/history/67c85dce21d9c1370cf38005_00fee259-67b7-4dd7-8b36-12503bbdba14___RS_HL_2681.jpeg",
        "info": {
            "name": "Cherry (including sour)",
            "condition": "healthy"
        }
    },
    {
        "photo": "https://res.cloudinary.com/dtbrnazjf/image/upload/history/67c85ebfaad46f83d4165c3c_00fee259-67b7-4dd7-8b36-12503bbdba14___RS_HL_2681.jpeg",
        "info": {
            "name": "Cherry (including sour)",
            "condition": "healthy"
        }
    }
]
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Plant Identification

POST /user/plant-identification

> Body Parameters

```yaml
photo: file:///home/poula/Pictures/Screenshots/Screenshot from 2025-02-22 18-35-27.png

```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» photo|body|string(binary)| yes |none|

> Response Examples

> 200 Response

```json
{
    "name": "Soybean",
    "condition": "healthy"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

