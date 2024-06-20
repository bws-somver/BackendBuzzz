const pool = require('../../../DataBase/Connection');

// Function to validate parameters
const validateParams = (data) => {
    const requiredParams = [
        'ProfilePostLikeId', 'ProfilePostId','UserId', 'CreatedBy', 'UpdatedBy'
    ];
    for (const param of requiredParams) {
        if (data[param] == null || data[param] == undefined) {
            return { Message: `${param} is null or undefined`, Status: 201 };
        }
    }
    return null; // Parameters are valid
};


module.exports = {
    SaveUpdatePostLike: (data) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(data);
                const validationError = validateParams(data);
                if (validationError) {
                    return reject(validationError),
                    console.log(validationError)
                }
           
                var s ,m;
                pool.query(
                    'CALL SaveUpdatePostLike(?, ?, ?, ?, ?,  @?, @?)',
                    [
                        data.ProfilePostLikeId, 
                        data.ProfilePostId, 
                        data.UserId, 
                        data.CreatedBy,
                        data.UpdatedBy,
                        data.IsLike,
                            s, m
                    ],
                    (error, results) => {
                        if (error) {
                            return reject(results)
                         
                        }
                        const message = results.message || results.errorMessage; // check for both message and error message
                        const status = results.status || results.errorstatus;
                        resolve({
                          status: status,
                       message:   message
                        });
                    }
                );
            } catch (e) {
                console.error("Error in Post Like:", e);
                reject(e);
            }
        });
    },

    GetAllPostLike: (UserId) => {
        return new Promise((resolve, reject) => {
            try {
               // console.log("S",UserId);
                var s, m;
                pool.query(`call GetAllPostLike( ?, @?,@?)`, [UserId,s, m], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log("Post Like", results);
                    resolve(results[0],
                        {
                            status:200,
                            message :" Post Like Get Sucessfully "
                        }
                    );
                });
            } catch (e) {
                console.error("Error in Post Like:", e);
                reject(e);
            }
        });
    },

    GetSinglePostLike: (SingleData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("S",SingleData);
                var s,m;
                pool.query('CALL GetSinglePostLike(?,?,?,@?,@?)', [SingleData.ProfilePostLikeId,SingleData.ProfilePostId,SingleData.UserId,s,m], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log("SingleProfilePostLike", results);
                    resolve(results[0],
                        {
                            status:200,
                            message :" Post Like Get Sucessfully "
                        }
                    );
                });
                
               
            } catch (error) {
                reject(error);
            }
        });
    },

    DeletePostLike: (Delete) => {
        return new Promise((resolve, reject) => {
            try {
      
               console.log("S",Delete);
                var s,m;
                pool.query('CALL PostLikeDelete(?,?,?, @?,@?)', [Delete.ProfilePostLikeId,Delete.ProfilePostId,Delete.UserId,s,m], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    const outputParams = results[0]; // Retrieve the output parameters

                    resolve({
                        status:200,
                        message :" Post Like Delete Sucessfully "
                    });
                });
            }  catch (e) {
                console.error("Error in  Post Like:", e);
                reject(e);
            }
        });
    }
};
