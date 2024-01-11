const PatientModel = (sequelize, { DataTypes }) => {
    const Patient = sequelize.define(
        'patient',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            createdAt: false,
            updatedAt: false,
        },
    );
    return Patient;
};

module.exports = PatientModel;
