//let date = new Date();
//date.setDate(date.getDate() + 1)
exports.seed = function (knex, Promise) {
        // Deletes ALL existing entries
        return knex('recipes').del()
                .then(function () {
                        // Inserts seed entries
                        return knex('recipes').insert([{
                                        id: 1,
                                        recipe_name: "Fresh Tomato Salad",
                                        description: "Fresh garden tomatoes topped with herbs and \
                a simple olive oil and vinegar mixture.",
                                        directions: "1. Place tomatoes, red onion, and bocconcini \
                (if using) in shallow bowl. \n2. Drizzle with olive oil and \
                red wine vinegar. Toss to combine. \n3. Season with salt, \
                pepper, and fresh herbs to taste.",
                                        preparationTime: "10 min",
                                        cookTime: "0 min",
                                        portions: 4,
                                        notes: "Great to put in the fridge!"
                                },
                                {
                                        id: 2,
                                        recipe_name: "Lemonade",
                                        description: "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
                                        directions: "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
                                        preparationTime: "10 min",
                                        cookTime: "5 min",
                                        portions: 10,
                                        notes: "Best during a hot summer day!"
                                },
                                {
                                        id: 3,
                                        recipe_name: "Insalata Caprese",
                                        description: "Ripe tomatoes and top-quality mozzarella and \
                olive oil make the difference.",
                                        directions: "1.On a large platter, alternate and overlap the\
                tomato slices, mozzarella cheese slices, and basil leaves. \
                Drizzle with olive oil. Season with sea salt and pepper.",
                                        preparationTime: "10 min",
                                        cookTime: "15 min",
                                        portions: 6,
                                        notes: "Because this salad is so simple, fresh, top-quality\
                tomatoes and mozzarella are important."
                                },
                                {
                                        id: 4,
                                        recipe_name: "Classic Macaroni Salad",
                                        description: "This is a salad that everyone seems to love.\
                I always get lots of compliments on this recipe and it is \
                just a pleasing taste that seems to suit everyone.",
                                        directions: "1.Bring a large pot of lightly salted water\
                to a boil. Add the macaroni, and cook until tender, about\
                8 minutes. Rinse under cold water and drain. \n\
                In a large bowl, mix together the mayonnaise, vinegar,\
                sugar, mustard, salt and pepper. Stir in the onion, celery,\
                green pepper, carrot, pimentos and macaroni. Refrigerate for \
                at least 4 hours before serving, but preferably overnight.",
                                        preparationTime: "20 min",
                                        cookTime: "10 min",
                                        portions: 10,
                                        notes: "Aluminum foil can be used to keep food moist, \
                cook it evenly, and make clean-up easier."
                                },
                                {
                                        id: 5,
                                        recipe_name: "Spicy Mexican Tuna Salad",
                                        description: "Spice up your tuna fish with this easy \
                modified recipe that one of my student's families \
                made for me - authentic Mexican! Serve with tortilla chips.",
                                        directions: "1.Mix tuna, peas, chipotle peppers, mayonnaise,\
                dried minced onion, garlic salt, and black pepper in a bowl \
                until thoroughly combined.",
                                        preparationTime: "10 min",
                                        cookTime: "10 min",
                                        portions: 8,
                                        notes: "Per Serving: 47 calories; 1.6 g fat; 3 g carbohydrates;\
                5 g protein; 5 mg cholesterol; 96 mg sodium."
                                },
                                {
                                        id: 6,
                                        recipe_name: "Sweet Potato Breakfast Bake",
                                        description: "Paleo breakfast.",
                                        directions: "1.Preheat oven to 400 degrees F (200 degrees C).\n\
                2.Heat olive oil in a large skillet over medium heat. Add sweet potato;\
                cover and cook, stirring occasionally, until tender, 8 to 10 minutes. \
                Transfer to a large bowl.  \n\
                3.Cook and stir sausage in the same skillet over medium-high heat \
                until crumbled and browned, about 5 minutes. Add to the sweet potato in the bowl.\n\
                4. Cook and stir onion and red bell pepper in the same skillet until tender, \
                about 3 minutes. Season with salt and pepper. Add mushrooms and kale;\
                cook until kale softens, about 3 minutes more. Transfer to the bowl.\n\
                5. Whisk eggs, water, thyme, salt, and pepper together in a small bowl. \
                Stir into the sausage mixture. Pour into a large baking dish. \
                Whisk eggs, water, thyme, salt, and pepper together in a small bowl. \
                Stir into the sausage mixture. Pour into a large baking dish. \n\
                6. Bake in the preheated oven until sweet potato starts to brown, 20 to 25\
                minutes. Let stand for 5 minutes. Garnish with green onion.",
                                        preparationTime: "20 min",
                                        cookTime: "39 min",
                                        portions: 4,
                                        notes: "Per Serving: 489 calories; 34.2 g fat; 19.7 g carbohydrates; \
                25.6 g protein; 297 mg cholesterol; 1182 mg sodium."
                                },
                                {
                                        id: 7,
                                        recipe_name: "Easy Egg White Omelet",
                                        description: "This is my go-to breakfast every morning. Fast, easy, \
		            foolproof, customizable, and packed with protein, all for fewer calories\
		            than your average fast-food breakfast sandwich.",
                                        directions: "1.Spray a 9x5-inch glass or microwave-safe loaf pan with \
		            cooking spray; sprinkle the onion, green bell pepper, and mushrooms \
		            into the pan, and toss lightly with a fork just to mix. Season with \
		            salt and black pepper, and pour in the egg whites.\n\
                2.Cook in a microwave oven on High setting for 3 minutes. Remove and \
		            stir the cooked egg white from the side of the pan into the rest of \
		            the ingredients; cook for 3 more minutes on High. If the omelet is \
		            still a little runny on top, slice it into chunks and turn them over \
		            in the loaf pan; microwave for 30 more seconds on High. Adjust salt \
		            and pepper, and serve.",
                                        preparationTime: "10 min",
                                        cookTime: "10 min",
                                        portions: 4,
                                        notes: "Per Serving: 128 calories; 0.1 g fat; 0.8 g carbohydrates;\
		            24.9 g protein; 0 mg cholesterol; 371 mg sodium."
                                },
                                {
                                        id: 8,
                                        recipe_name: "Low-Fat Blueberry Bran Muffins",
                                        description: "These muffins are just as delicious and moist as regular \
		            muffins! They'll be gone before they have time to cool. Low-fat, healthy \
		            and yummy, imagine that.",
                                        directions: "1.Preheat oven to 375 degrees F (190 degrees C). Grease muffin \
		            cups or use paper muffin liners. Mix together wheat bran and milk, and let \
		            stand for 10 minutes.\n\
                2.In a large bowl, mix together applesauce, egg, brown sugar, and vanilla. \
		            Beat in bran mixture. Sift together all-purpose flour, whole wheat flour, \
		            baking soda, baking powder, and salt. Stir into bran mixture until just \
		            blended. Fold in blueberries. Scoop into muffin cups.  \n\
                3.Bake in preheated oven for 15 to 20 minutes, or until tops spring back \
		            when lightly tapped.",
                                        preparationTime: "15 min",
                                        cookTime: "20 min",
                                        portions: 12,
                                        notes: "Per Serving: 123 calories; 0.9 g fat; 28.3 g carbohydrates; \
		            3.7 g protein; 16 mg cholesterol; 250 mg sodium. "
                                },
                                {
                                        id: 9,
                                        recipe_name: "Satiny Chocolate Glaze",
                                        description: "A glossy chocolate glaze to drizzle over a Bundt cake. \
		It's also great on cookies and doughnuts.",
                                        directions: "1.In a double boiler over hot, but not boiling water, combine \
		chocolate chips, butter, and corn syrup. Stir until chips are melted and \
		mixture is smooth, then add vanilla.\n\
                2.Spread warm glaze over top of cake, letting it drizzle down the sides.",
                                        preparationTime: "10 min",
                                        cookTime: "8 min",
                                        portions: 4,
                                        notes: "Per Serving: 243 calories; 18.1 g fat; 23.9 g carbohydrates; \
		1.4 g protein; 23 mg cholesterol; 68 mg sodium."
                                },
                                {
                                        id: 10,
                                        recipe_name: "Too Much Chocolate Cake",
                                        description: "This cake won me First Prize at the county fair last year. \
		It is very chocolaty.",
                                        directions: "1.Preheat oven to 350 degrees F (175 degrees C).\n\
                2.In a large bowl, mix together the cake and pudding mixes, sour cream, oil, \
		beaten eggs and water. Stir in the chocolate chips and pour batter into a \
		well greased 12 cup bundt pan.\n\
                3.Bake for 50 to 55 minutes, or until top is springy to the touch and a wooden \
		toothpick inserted comes out clean. Cool cake thoroughly in pan at least an hour \
		and a half before inverting onto a plate If desired, dust the cake with \
		powdered sugar.",
                                        preparationTime: "20 min",
                                        cookTime: "39 min",
                                        portions: 12,
                                        notes: "Per Serving: 600 calories; 38.6 g fat; 60.9 g carbohydrates; 7.6 g protein; \
		79 mg cholesterol; 550 mg sodium. "
                                },
                                {
                                        id: 11,
                                        recipe_name: "Double Tomato Bruschetta",
                                        description: "A delicious and easy appetizer. The balsamic vinegar gives it a \
		little bite. Dried basil can be substituted but it is best with fresh.",
                                        directions: "1.Preheat the oven on broiler setting.\n\
                2.In a large bowl, combine the roma tomatoes, sun-dried tomatoes, garlic, \
		olive oil, vinegar, basil, salt, and pepper. Allow the mixture to sit \
		for 10 minutes.\n\
                3.Cut the baguette into 3/4-inch slices. On a baking sheet, arrange the \
		baguette slices in a single layer. Broil for 1 to 2 minutes, until slightly brown.\n\
                4. Divide the tomato mixture evenly over the baguette slices. Top the slices with \
		mozzarella cheese.\n\
                5. Broil for 5 minutes, or until the cheese is melted.",
                                        preparationTime: "15 min",
                                        cookTime: "7 min",
                                        portions: 12,
                                        notes: "Per Serving: 215 calories; 8.9 g fat; 24.8 g carbohydrates; 9.6 g protein; \
		12 mg cholesterol; 426 mg sodium. "
                                },
                                {
                                        id: 12,
                                        recipe_name: "The Best Meatballs",
                                        description: "I never knew how to make good meatballs until I found this recipe.\
		I normally make mine with just ground beef and they still taste great. I've used \
		the combination of pork, beef and veal and they are equally good. Definitely use \
		fresh bread crumbs and freshly grate your cheese instead of using the canned \
		variety...it really does make a difference.",
                                        directions: "1.Combine beef, veal, and pork in a large bowl. Add garlic, eggs, \
		cheese, parsley, salt and pepper..\n\
                2.Blend bread crumbs into meat mixture. Slowly add the water 1/2 cup at a time. \
		The mixture should be very moist but still hold its shape if rolled into meatballs. \
		(I usually use about 1 1/4 cups of water). Shape into meatballs. \n\
                3.Heat olive oil in a large skillet. Fry meatballs in batches. When the meatball \
		is very brown and slightly crisp remove from the heat and drain on a paper towel. \
		(If your mixture is too wet, cover the meatballs while they are cooking so that \
		they hold their shape better.)",
                                        preparationTime: "30 min",
                                        cookTime: "20 min",
                                        portions: 8,
                                        notes: "Per Serving: 613 calories; 53.2 g fat; 6.6 g carbohydrates; 26.6 g protein; \
		149 mg cholesterol; 333 mg sodium. "
                                },
                                {
                                        id: 13,
                                        recipe_name: "Meatball Sandwich",
                                        description: "Meatballs in tomato sauce with melted cheese on a lightly toasted baguette.",
                                        directions: "1.Preheat the oven to 350 degrees F (175 degrees C).\n\
                2.In a medium bowl, gently mix by hand the ground beef, bread crumbs, Italian \
		seasoning, garlic, parsley, Parmesan cheese, and egg. Shape into 12 meatballs, \
		and place in a baking dish.\n\
                3.Bake for 15 to 20 minutes in the preheated oven, or until cooked through. Meanwhile, \
		cut the baguette in half lengthwise, and remove some of the bread from the inside to \
		make a well for the meatballs. Brush with olive oil, and season with garlic powder \
                                        and salt.Slip the baguette into the oven during the last 5 minutes of the meatball 's \
                4. While the bread toasts, warm the spaghetti sauce in a saucepan over medium heat. \
		When the meatballs are done, use a slotted spoon to transfer them to the sauce. \
		Spoon onto the baguette and top with slices of provolone cheese. Return to the \
		oven for 2 to 3 minutes to melt the cheese. Cool slightly, cut into servings, and enjoy!",
                                        preparationTime: "20 min",
                                        cookTime: "20 min",
                                        portions: 4,
                                        notes: "Per Serving: 781 calories; 31.9 g fat; 78.2 g carbohydrates; 43.6 g protein;\
		141 mg cholesterol; 1473 mg sodium."
                                },
                                {
                                        id: 14,
                                        recipe_name: "Italian Vegetable Soup",
                                        description: "Makes a lot and is very, very good.",
                                        directions: "1.Place ground beef in a large soup pot. Cook over medium heat until \
		evenly browned. Drain excess fat. Stir in onion, celery, carrots, garlic, chopped \
		tomatoes, tomato sauce, beans, water and bouillon. Season with parsley, oregano and \
		basil. Simmer for 20 minutes.\n\
                2.Stir in cabbage, corn, green beans and pasta. Bring to a boil, then reduce heat. \
		Simmer until vegetables are tender and pasta is al dente. Add more water if needed.",
                                        preparationTime: "20 min",
                                        cookTime: "50 min",
                                        portions: 8,
                                        notes: "Per Serving: 441 calories; 16.6 g fat; 52.5 g carbohydrates; 22.4 g protein; \
		48 mg cholesterol; 1295 mg sodium. "
                                },
                                {
                                        id: 15,
                                        recipe_name: "Pressure Cooker Italian Chicken Soup",
                                        description: "This recipe was given to me by my mom, but I've also tweaked it. \
		I can't guarantee that it isn't from a cookbook somewhere--mom can't remember \
		where it came from--but it's an old family favorite and a great soup for a fall \
		day. Made in a pressure cooker, it takes approximately 20 minutes for a full, \
		hearty meal. This soup also freezes beautifully.",
                                        directions: "1.heat 1 teaspoon olive oil in a pressure cooker over medium heat. \
		Add sausage meat, and cook until browned, breaking it into crumbles. Remove sausage \
		to a plate and drain oil. Add another 1 teaspoon of olive oil to pressure cooker;\
		cook onion and garlic until onion is transparent. Add barley and stir 1 minute. \
		Return sausage to pressure cooker. Add lentils, chicken, parsley, and chicken stock \
		to cooker, adding enough stock to completely cover chicken. Close cover securely; \
		place pressure regulator on vent pipe. Bring pressure cooker to full pressure over \
		high heat (this may take 15 minutes). Reduce heat to medium high; cook for 9 minutes. \
		Pressure regulator should maintain a slow steady rocking motion; adjust heat \
		if necessary.\n\
                2.Remove pressure cooker from heat; use quick-release following manufacturer's \
		instructions or allow pressure to drop on its own. Open cooker and remove chicken; shred \
		meat and return to soup. Add garbanzo beans, spinach and salsa; stir to blend and heat \
		through before serving.",
                                        preparationTime: "25 min",
                                        cookTime: "25 min",
                                        portions: 8,
                                        notes: "Per Serving: 245 calories; 3.3 g fat; 37.3 g carbohydrates; 17.4 g protein; \
		16 mg cholesterol; 527 mg sodium."
                                },
                                {
                                        id: 16,
                                        recipe_name: "Italian Bread II",
                                        description: "A simple crusty Italian style loaf bread.",
                                        directions: "1.Add all ingredients except egg, 1 tablespoon water, sesame seeds,\
                                        and cornmeal into your bread machine in the order suggested by the manufacturer.\
                                        Select the dough cycle.\n\
                                        2. Divide dough into 2 parts and form into loaves.Sprinkle cornmeal on greased\
                                        baking sheet.Place loaves on pan seam side down.Brush top of loaves with water.\
                                        Let rise til double,\
                                        about 50 minutes.\n\
                                        3. Preheat oven to 375 degrees F(190 degrees C).\n\
                                        4. Brush loaves with egg wash.Sprinkle with sesame seeds.Make 4 cuts about 1 / 4\
                                        inch deep across top of log.Place a pan of hot water in bottom of oven.\
                                        Bake bread for 25 to 30 minutes or until golden.To make a nice crusty bread,\
                                        bake bread in the afternoon and pop into oven again for 5 minutes before meal.\
                                        Makes a very crusty bread!You would be surprised how much better it is if you\
                                        heat it that last 5 minutes.Try it.I learned this in a bread machine class!",
                                        preparationTime: "10 min",
                                        cookTime: "30 min",
                                        portions: 12,
                                        notes: "Per Serving: 147 calories; 2.8 g fat; 25.9 g carbohydrates; 4.1 g protein;\
		16 mg cholesterol; 298 mg sodium."
                                }
                        ]);
                });
}