module.exports = (sequelize, Sequelize) => {
	const Ssh = sequelize.define('ssh', {
        ip: {
            type: Sequelize.STRING,
            notEmpty: true,
			allowNull: false,
			comment: "IP"
        },
        port: {
            type: Sequelize.INTEGER,
            notEmpty: true,
			allowNull: false,
			comment: "port"
        },
        username : {
            type: Sequelize.STRING,
            notEmpty: true,
			allowNull: false,
			comment: "user"
        },
        key : {
            type: Sequelize.INTEGER,
            notEmpty: true,
			allowNull: false,
			comment: "path to private ssh key"
        },
	}, {
        tableName: 'ssh',
	});

	return Ssh;
}