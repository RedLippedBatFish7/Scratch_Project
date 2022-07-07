controller.updateOptions = async (req, res, next) => {
  console.log('in the updateOptions');
  const instructions = req.body;
  const user = req.cookies.subuser;
  // loop through all the objs
  for (let id in instructions) {
    const [type, catId, catName, newValue] = instructions[id];
    console.log(instructions[id]);
    let queryText = ``;
    let params = [];
    if (catId !== 'categoryChange') {
      // update statement
      if (type === 'update') {
        params = [id, newValue];
        queryText = `
          UPDATE packing_options
          SET item_name = $2
          WHERE _id = $1;
          `;
      }
      // insert statement
      else if (type === 'insert') {
        // if inserting an item into an existing category
        if (catId > 0) {
          params = [user, newValue, catId];
          queryText = `
            INSERT INTO packing_options (sub_id, item_name, category_id)
            VALUES ($1, $2, $3);
            `;
        }
        // if inserting item into a newly created category, we need to find its id
        else {
          params = [user, newValue, catName];
          queryText = `
            INSERT INTO packing_options (sub_id, item_name, category_id)
            SELECT $1, $2, _id as category_id
            FROM categories
            WHERE category_name = $3 and sub_id = $1;
            `;
        }
      }
      // delete statement
      else if (type === 'delete') {
        params = [id];
        queryText = `
          DELETE FROM packing_options
          WHERE _id = $1;
          `;
      }
    } else if (catId === 'categoryChange') {
      // update statement
      if (type === 'update') {
        params = [id, newValue];
        queryText = `
          UPDATE categories
          SET category_name = $2
          WHERE _id = $1;
          `;
      }
      // insert statement
      else if (type === 'insert') {
        params = [user, newValue];
        queryText = `
          INSERT INTO categories (sub_id, category_name)
          VALUES ($1, $2)
          RETURNING *;
          `;
      }
      // delete statement
      else if (type === 'delete') {
        // if deleting a category, also delete all items that used it
        params = [id];
        queryText = `
          DELETE FROM categories
          WHERE _id = $1;
          `;
      }
    }
    // now query!
    console.log(params);
    const results = await pool.query(queryText, params);
    // if it's a new column, map its old -> new id
    if (type === 'insert' && catId === 'categoryChange') {
      if (!res.locals.mappings) res.locals.mappings = {};
      res.locals.mappings[id] = results.rows[0]._id;
    }
  }
  return next();
};
