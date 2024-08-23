import { central, db1, db2, db3, vault } from "./src/database.js";

const dbs = {
  db1: db1,
  db2: db2,
  db3: db3
};


async function getUserData(id) {
  try {
    const db = await central(id);
    const [info, secure] = await Promise.all([dbs[db], vault(id)]);
    console.log(db);
    return { id, ...info, ...secure };
  } catch (error) {
    return error;
  }
}

(async () => {
  const time = new Date().getTime();
  console.log(await getUserData(1));
  console.log("process completed in:", new Date().getTime() - time, "ms");
})();

   