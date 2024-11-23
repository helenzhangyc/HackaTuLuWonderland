import re
import json

with open("query.cypher") as file:
    lines = file.read().split("\n")

queries: dict = {}
query: list = []
query_count: int = 0
foundMatch: bool = False

for line in lines: 
    if "MATCH" in line:
         foundMatch = True

    if foundMatch:
        query.append(line)

    if "RETURN" in line:
          query_count += 1
          queries[str(query_count)] = " ".join(query)
          query: list = []
          foundMatch = False

with open('ID2query.json', 'w') as json_out:
    json.dump(queries, json_out, indent=3)


    



