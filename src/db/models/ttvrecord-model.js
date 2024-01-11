const TTVRecordModel = (sequelize, { DataTypes }) => {
    const TTVRecord = sequelize.define(
        'ttvrecord',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            patient_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'patient',
                    key: 'id',
                },
            },
            record_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            temperature: {
                type: DataTypes.DECIMAL(5, 2),
            },
            pulse: {
                type: DataTypes.INTEGER,
            },
            respiration: {
                type: DataTypes.INTEGER,
            },
            systolic_bp: {
                type: DataTypes.INTEGER,
            },
            diastolic_bp: {
                type: DataTypes.INTEGER,
            },
        },
        {
            createdAt: false,
            updatedAt: false,
        },
    );

    TTVRecord.associate = (models) => {
        TTVRecord.belongsTo(models.Patient, {
            foreignKey: 'patient_id',
            onDelete: 'CASCADE',
        });
    };

    return TTVRecord;
};

module.exports = TTVRecordModel;
