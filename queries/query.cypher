// Systems that are affected by docker vulnerabilities through SoftwareInstallation
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
RETURN sys;

// Involved AssignedSystemRole with the systems
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
MATCH (role:AssignedSystemRole)-[:assigned_for]-(sys)
RETURN DISTINCT role;

// Involved ServiceProvider with the system
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
MATCH (serPro:ServiceProvider)-[:provides_service]-(sys)
RETURN serPro;

// Organisation of the involved person (system → application → OrgUnit)
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
MATCH (app:Application)-[:runs_on]-(sys)
MATCH (app)-[:owned_by]-(org:OrgUnit)
RETURN DISTINCT org;

// heads of the involved organisations
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND si.version >= "23.0" AND si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND si.version >= "23.0" AND si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND si.version >= "4.10.1" AND si.version <= "4.34.2"
)
MATCH (app:Application)-[:runs_on]-(sys)
MATCH (app)-[:owned_by]-(org:OrgUnit)
MATCH (p:Person) - [:head_of] - (org)
RETURN DISTINCT p;

// Application
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND si.version >= "23.0" AND si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND si.version >= "23.0" AND si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND si.version >= "4.10.1" AND si.version <= "4.34.2"
)
MATCH (app:Application)-[:runs_on]-(sys)
RETURN DISTINCT app;

// Involved Country with the systems
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
MATCH (sys)-[:in_country]-(ctry:Country)
RETURN DISTINCT ctry;

// Person involved with the involved AssignedsystemRole
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
MATCH (asrole:AssignedSystemRole)-[:assigned_for]-(sys)
MATCH (p:Person)-[:role_assigned]-(asrole)
RETURN DISTINCT p;

// Location
MATCH (sys:System)-[:related_software]-(si:SoftwareInstallation)
WHERE
(
si.product = "Docker" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker CLI" AND
si.version >= "23.0" AND
si.version <= "26.1.3"
) OR
(
si.product = "Docker Desktop" AND
si.version >= "4.10.1" AND
si.version <= "4.34.2"
)
MATCH (sys)-[:related_ipaddress]-(ip:IPAddress)-[:in_segment]-(VNS:VirtualNetworkSegment)-[:at_location]-(loc:Location)

RETURN DISTINCT loc;
