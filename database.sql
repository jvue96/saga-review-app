CREATE TABLE "character" (
	"id" serial primary key,
	"name" varChar (255) NOT NULL,
	"swapi_url" varChar (255)
); 
-- swapi = star wars API
	
CREATE TABLE "person" (
	"id" serial primary key,
	"name" varChar(80) NOT NULL,
	"fav_char_id" integer references "character" 
);

INSERT INTO "character" ("name")
VALUES ('Han Solo')

INSERT INTO "character" ("name")
VALUES ('Salacious B Crumb');

INSERT INTO "character" ("name")
VALUES ('Luke Skywalker');

INSERT INTO "character" ("name")
VALUES ('Jar Jar Binks');

INSERT INTO "character" ("name")
VALUES ('Yoda');

INSERT INTO "person" ("name", "fav_char_id") 
VALUES ('Mary', 1);

INSERT INTO "person" ("name", "fav_char_id") 
VALUES ('Rowan', 2);

INSERT INTO "person" ("name", "fav_char_id") 
VALUES ('Joe', 3);

INSERT INTO "person" ("name", "fav_char_id") 
VALUES ('Jarvis', 4);

INSERT INTO "person" ("name", "fav_char_id") 
VALUES ('Ben', 5);



-- TEST SQL GET / JOIN --

SELECT "person"."id", 
"person"."name" AS "person name",  
"character"."name" AS "character name" FROM "person"
JOIN "character" on "person"."fav_char_id" = "character"."id";