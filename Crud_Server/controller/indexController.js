const express = require('express');
const pool = require('../model/dbConnection');


exports.indexController = {

    //  Get Controller 

    getController: async (req, res) => {
        try {
            let pgQuery = {
                text: `SELECT * from tbl_todo order by todo_id desc`
            }
            try {
                let dbResult = await pool.query(pgQuery);

                if (dbResult.rows.length > 0) {
                    // console.log(dbResult.rows);
                    return res.status(200).json({
                        status: "Success",
                        result: dbResult.rows
                    })
                }
                else {
                    return res.status(404).json({
                        status: "No data to show"
                    })
                }
            }
            catch (error) {
                console.log("Error Executing Query: " + error);
                return res.json({
                    status: "Error Please try again later"
                })
            }
        }

        catch (error) {
            if (error) {
                console.log("Error type: " + error);
                return res.status(500).json({
                    message: 'Oops something went wrong'
                })
            }
        }
    },

    // Post Controller

    postController: async (req, res) => {

        try {

            let { desc } = req.body
            let pqQuery = {
                text: `INSERT INTO tbl_todo (todo_desc) VALUES ($1)`,
                values: [
                    desc
                ]
            }

            try {
                let dbResult = await pool.query(pqQuery);
                return res.status(200).json({
                    status: "Success",
                    message: "Todo Added Successfully"
                })

            } catch (error) {
                return res.status(422).json({
                    status: "Failed",
                    message: "Failed Adding Todo"
                })
            }

        }

        catch (error) {
            if (error) {
                console.log("Error type: " + error);
                return res.status(500).json({
                    message: 'Oops something went wrong'
                })
            }
        }
    },


    // ----- Patch Controller 

    patchController: async (req, res) => {
        try {

            let { desc } = req.body;
            let { id } = req.params

            let getQuery = {
                text: `SELECT todo_id from tbl_todo where todo_id = $1`,
                values: [
                    id
                ]
            }

            let pgQuery = {
                text: `UPDATE tbl_todo SET todo_desc = $1 where todo_id = $2`,
                values: [
                    desc,
                    id
                ]
            }

            try {
                let getDbResult = await pool.query(getQuery);

                if (getDbResult.rows.length === 0) {
                    console.log("Todo not present");
                    return res.status(422).json({
                        status: "Failed",
                        message: "Todo Not Availabe"
                    })
                }
                else {
                    let dbResult = pool.query(pgQuery);
                    return res.status(200).json({
                        status: "Success",
                        message: "Todo Updated Successfully"
                    })
                }


            } catch (error) {
                console.log("Error Executing Query: " + error);
                return res.json({
                    status: "Error Please try again later"
                })
            }

        }
        catch (error) {
            if (error) {
                console.log("Error type: " + error);
                return res.status(500).json({
                    message: 'Oops something went wrong'
                })
            }
        }
    },


    // Delete Controller

    deleteController: async (req, res) => {
        try {
            let { id } = req.params


            let getQuery = {
                text: `SELECT todo_id from tbl_todo where todo_id = $1`,
                values: [
                    id
                ]
            }

            let pgQuery = {
                text: `DELETE FROM tbl_todo where todo_id = $1`,
                values: [
                    id
                ]
            }

            try {
                let getDbResult = await pool.query(getQuery);

                if (getDbResult.rows.length === 0) {
                    console.log("Todo not present");
                    return res.status(422).json({
                        status: "Failed",
                        message: "Todo Not Availabe"
                    })
                }
                 {
                    let dbResult = pool.query(pgQuery);
                    return res.status(200).json({
                        status: "Success",
                        message: "Todo Deleted Successfully"
                    })
                }

            } catch (error) {
                console.log("Error Executing Query: " + error);
                return res.json({
                    status: "Error Please try again later"
                })
            }
        }

        catch (error) {
            if (error) {
                console.log("Error type: " + error);
                return res.status(500).json({
                    message: 'Oops something went wrong'
                })
            }
        }
    }


}
