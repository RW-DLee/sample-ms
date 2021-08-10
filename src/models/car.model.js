import connection from "../database/db.js";

class Car {
  constructor(car) {
    this.id = car.id;
    this.make = car.make;
    this.model = car.model;
  }
  static create(newCar, result) {
    connection.query("INSERT INTO cars SET ?", newCar, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      const data = {
        "id": res.insertId,
        "make": newCar.make,
        "model": newCar.model
      }

      console.log(data);
      result(null, data);
    });
  }
  static findById(carId, result) {
    connection.query(`SELECT * FROM cars WHERE id = ${carId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found car: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }
  static getAll(result) {
    connection.query("SELECT * FROM cars", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("cars: ", res);
      result(null, res);
    });
  }
  static updateById(id, car, result) {
    connection.query(
      "UPDATE cars SET make = ?, model = ? WHERE id = ?",
      [car.make, car.model, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated car: ", { id: id, ...car });
        result(null, { id: id, ...car });
      }
    );
  }
  static remove(id, result) {
    connection.query("DELETE FROM cars WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted car with id: ", id);
      result(null, res);
    });
  }
  static removeAll(result) {
    connection.query("DELETE FROM cars", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} cars`);
      result(null, res);
    });
  }
}







export default Car;