'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // 1
    await queryInterface.bulkInsert('categories', [{
      name: 'Hardware',
      parent_id: 0,
    }]);

    // 2
    await queryInterface.bulkInsert('categories', [{
      name: 'Periféricos',
      parent_id: 0,
    }]);

    // 3
    await queryInterface.bulkInsert('categories', [{
      name: 'Monitores',
      parent_id: 0,
    }]);

    // 4
    await queryInterface.bulkInsert('categories', [{
      name: 'Processadores',
      parent_id: 1,
    }]);

    // 5
    await queryInterface.bulkInsert('categories', [{
      name: 'AMD',
      parent_id: 4,
    }]);

    // 6
    await queryInterface.bulkInsert('categories', [{
      name: 'Intel',
      parent_id: 4,
    }]);

    // 7
    await queryInterface.bulkInsert('categories', [{
      name: 'Placas de Vídeo',
      parent_id: 1,
    }]);

    // 8
    await queryInterface.bulkInsert('categories', [{
      name: 'AMD',
      parent_id: 7,
    }]);

    // 9
    await queryInterface.bulkInsert('categories', [{
      name: 'Nvidia',
      parent_id: 7,
    }]);

    // 10
    await queryInterface.bulkInsert('categories', [{
      name: 'Mouses',
      parent_id: 2,
    }]);

    // 11
    await queryInterface.bulkInsert('categories', [{
      name: 'Teclados',
      parent_id: 2,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
