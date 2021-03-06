INSERT INTO items(price, item_name, item_photo_url, item_description)
VALUES (7, 'BaconXXL® Burger', 'images/burger1.png', 'Two of our classic beef patties with extra strips of crispy bacon and cheddar cheese. Made with 100% Canadian beef.'),
(7, 'BiteMe''s Double® Burger', 'images/burger2.png', 'Two beef patties topped with cheddar cheese, onions, tomatoes, and lettuce.'),
(5, 'Classic Chicken Sandwich Burger', 'images/burger3.png', 'Crispy fried chicken served with lettuce, tomatoes, pickles, and house sauce.'),
(5, 'Spicy Chicken Sandwich Burger', 'images/burger4.png', 'Our mouth-watering Chicken Burger infused with a blend of 5 spices.'),
(11, 'BaconXXL® Combo', 'images/set-menu1.png', 'Celebrate Canadian cattle farmers with our famously BIG and juicy BaconXXL® burger served with fries and a medium soft drink of your choice.'),
(11, 'BiteMe''s Double® Combo', 'images/set-menu2.png', 'Fill up with our familiar BiteMe''s Double® Burger. Comes with fries and a medium soft drink of your choice.'),
(9, 'Classic Chicken Sandwich Combo', 'images/set-menu3.png', 'Treat yourself to our Classic Chicken Sandwich! Served with fries and a soft drink of your choice.'),
(9, 'Spicy Chicken Sandwich Combo', 'images/set-menu4.png', 'Take the spice of our Spicy Chicken Sandwich to the next level with a side of fries and soft drink of your choice.');


INSERT INTO users(whole_name, phone_number, email)
VALUES ('Bob Ross', '111-111-1111', 'BobRoss@gmail.com'),
('Bob Builder', '222-222-2222', 'BobBuilder@gmail.com'),
('Charlie Chaplin', '333-333-3333', 'CharlieChaplin@hotmail.com');

INSERT INTO orders(users_id, order_complete, created_at, estimate_time_minute, started_at, completed_at, bill_paid, message)
VALUES (1, true, '2022-06-06 20:15:00', 25, '2022-06-06 20:20:00', '2022-06-06 20:21:00', true, 'Your order is ready Mr. Ross'),
(2, true, '2022-06-06 `19:15:00', 25, '2022-06-06 19:30:00', '2022-06-06 19:45:00', true, 'Your order is ready Mr. Builder'),
(3, true, '2022-06-06 10:15:00', 25, '2022-06-06 10:20:00', '2022-06-06 10:21:00', true, 'Your order is ready Mr. Chaplin');

INSERT INTO order_items(items_id, order_id, quantity)
VALUES (1, 2, 3), (2, 3, 4), (3, 1, 5);
