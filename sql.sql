INSERT INTO category (name, group_section, description)
VALUES ('Books & Courses', 'Books & Courses', 'Books & Courses'),
  ('Camping & Outdoor', 'Camping & Outdoor', 'Camping & Outdoor'),
  ('Fashion & Luggage', 'Fashion & Luggage', 'Fashion & Luggage')
  ('Groceries & Household', 'Groceries & Household', 'Groceries & Household'),
  ('Health & Personal Care', 'Health & Personal Care', 'Health & Personal Care'),
  ('Home & Appliance', 'Home & Appliance', 'Home & Appliance'),
  ('Sports & Training', 'Sports & Training', 'Sports & Training'),
  ('TV, Audio & Media', 'TV, Audio & Media', 'TV, Audio & Media'),
  ('Baby & Toddler', 'Baby & Toddler', 'Baby & Toddler'),
  ('Office & Stationery', 'Office & Stationery', 'Office & Stationery'),
  ('Garden, Pool & Pation', 'Garden, Pool & Pation', 'Garden, Pool & Pation')
  ('Liquior', 'Liquior', 'Liquior'),
  ('Cellphones & Smartwatches', 'Cellphones & Smartwatches', 'Cellphones & Smartwatches'),
  ('Computer & Electronic', 'Computer & Electronic', 'Computer & Electronic')


INSERT INTO shop (name, mall_id, category_id) 
VALUES ('Shoprite', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[4,5,6,10,11,12]);
  ('Identity', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Shoprite Liquior', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[12]),
  ('Apple iStore', ARRAY[2,6,9], ARRAY[13,14]),
  ('Cell C', ARRAY[2,3,4,5,6,7,8,9,10], ARRAY[13,14]),
  ('Clicks', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[5,9]),
  ('CNA', ARRAY[2,3,4,5,6,7,8,9,10], ARRAY[1,10]),
  ('Game', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[1,2,3,4,5,6,7,8,9,10,11,13,14]),
  ('Cotton On', ARRAY[2,4,5,6,8,9], ARRAY[2,3,9]),
  ('Edgars', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,5,7,9]),
  ('Spar', ARRAY[1,3,4,5,6,7,8,10], ARRAY[4,5,6,10,11,12]),
  ('Spar Liquior', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[12]),
  ('Pick n Pay', ARRAY[2,3,4,7,8,9,10], ARRAY[4,5,6,10,11,12]),
  ('Checkers Hyper', ARRAY[2,4,6,8,9], ARRAY[4,6,10,11,12]),
  ('Checkers Liquior', ARRAY[2,4,6,8,9], ARRAY[12]),
  ('Exact', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Foschini', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Game Liquior', ARRAY[2,3,4,5,6,7,8,9,10], ARRAY[12]),
  ('H&M', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('MTN', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[13,14]),
  ('Vodacom', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[13,14]),
  ('iStore', ARRAY[2,6,9], ARRAY[13,14]),
  ('Jet', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Legit', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Markham', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Mr Price', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Sportscene', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Truworths', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,9]),
  ('Woolworths', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[2,3,5,9]),
  ('Zara', ARRAY[2,4,6,8,9], ARRAY[2,3,5,9], ARRAY[3]),
  ('Mikro', ARRAY[2,3,4,6,7,9], ARRAY[1,2,3,4,5,6,7,8,9,10,11,13,14]),
  ('Totalsports', ARRAY[1,2,3,4,5,6,7,8,9,10], ARRAY[3,7] );
  




INSERT INTO mall (name, location) 
VALUES ('Soshanguve Crossing Mall', 'Ruth First Road &, Aubrey Matlakala St, Soshanguve, 0164');
  ('Menlyn Park Shopping Centre', 'Atterbury Road And, Lois Ave, Menlyn, Pretoria, 0063'),
  ('Fourways Mall', '11 Ruby Cl, Witkoppen, Sandton, 2068'),
  ('Sandton City Mall', '83 Rivonia Rd, Sandhurst, Sandton, 2196'),
  ('Eastgate Shopping Centre', '43 Bradford Rd, Bedfordview, Germiston, 2008'),
  ('Mall of Africa', 'Lone Creek Cres & Magwa Crescent, Waterfall City, Midrand, 1685'),
  ('Centurion Mall', '1269 Gordon Hood Rd, Centurion Central, Pretoria, 0046'),
  ('Westgate Mall', '120 Ontdekkers Road, Roodepoort, 1725'),
  ('Rosebank Mall', 'Cradock Ave, Rosebank, Johannesburg, 2196'),
  ('Hyde Park Corner', 'Cnr Jan Smuts Avenue and William Nicol Drive, 6th Rd, Hyde Park, Johannesburg, 2196');

