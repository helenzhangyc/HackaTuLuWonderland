from neo4j import GraphDatabase, RoutingControl
from neo4j.exceptions import DriverError, Neo4jError

USER = "attendee10"
URI = "neo4j+s://hackatum-five.graphdatabase.ninja:443"
AUTH = (USER, "WIOXUNGG.B")

drv = GraphDatabase.driver(URI, auth=AUTH, max_connection_lifetime=60)
drv.database = USER
sess = drv.session()
res = sess.run("MATCH (n) RETURN n LIMIT 1")
print(res.single())
