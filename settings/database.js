import { connect } from "mongoose";

export const startConnection = async ({ uri, database }) => {
  try {
    const db = await connect(uri, {
      db: database,
    });

    console.log(`Connected to ${db.connection.name} database`);
  } catch (error) {
    console.log(error);
  }
};
