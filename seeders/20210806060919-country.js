module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('countries', [{
            country_name: "India"
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('countries', null, {});
    }
};