{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "john@example.com", 
            "fields": ["name", "email", "id"],
            "type": "best_fields"
          }
        }
      ],
      
    }
  },
  "sort": 
    {
      "_script": {
        "type": "number",
        "script": {
          "lang": "painless",
          "source": """
            if (doc['state.keyword'].value == 'Active') return 4;
            if (doc['state.keyword'].value == 'NoVerified') return 3;
            if (doc['state.keyword'].value == 'Inactive') return 2;
            if (doc['state.keyword'].value == 'Banned') return 1;
            return 0;
          """
        },
        "order": "desc"  
      }
    },
    {
      "createdAt": {
        "order": "desc"
      }
    }
  ]
}


{
  "query":{
  "bool": {
    "must": [
      {
        "multi_match": {
          "query": "john@example.com",
          "fields": ["name", "email", "id"],
          "type": "best_fields"
        }
      }
    ]
  },

}
