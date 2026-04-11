-- PostgreSQL: use if `guest.meal_choice` is still a native ENUM (legacy Steak/Chicken/Fish)
-- and inserts fail for "Filet Mignon" / "Grilled Seabass". Safe to skip if the column is already varchar.

ALTER TABLE guest
  ALTER COLUMN meal_choice DROP DEFAULT;

ALTER TABLE guest
  ALTER COLUMN meal_choice TYPE varchar(64)
  USING meal_choice::text;

ALTER TABLE guest
  ALTER COLUMN meal_choice SET DEFAULT 'Filet Mignon';
