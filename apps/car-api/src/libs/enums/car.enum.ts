import { registerEnumType } from '@nestjs/graphql';

export enum CarBrand {
	TOYOTA = 'TOYOTA',
	HYUNDAI = 'HYUNDAI',
	KIA = 'KIA',
	TESLA = 'TESLA',
	BMW = 'BMW',
	MERCEDES = 'MERCEDES',
	AUDI = 'AUDI',
	CHEVROLET = 'CHEVROLET',
	NISSAN = 'NISSAN',
	SUBARU = 'SUBARU',
	VOLVO = 'VOLVO',
	DONGFENG = 'DONGFENG',
	LEXUS = 'LEXUS',
	FORD = 'FORD',
	PORSCHE = 'PORSCHE',
	ISUZU = 'ISUZU',
	FOTON = 'FOTON',
	JEEP = 'JEEP',
	OTHER = 'OTHER',
}

registerEnumType(CarBrand, {
	name: 'CarBrand',
});

export enum CarType {
	SEDAN = 'SEDAN',
	LUXURY = 'LUXURY',
	ELECTRIC = 'ELECTRIC',
	HATCHBACK = 'HATCHBACK',
	SUV = 'SUV',
	MUV = 'MUV',
}

registerEnumType(CarType, {
	name: 'CarType',
});

export enum CarStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(CarStatus, {
	name: 'CarStatus',
});

export enum CarLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}

registerEnumType(CarLocation, {
	name: 'CarLocation',
});

export enum Cartransmission {
	MANUAL = 'MANUAL',
	AUTOMATIC = 'AUTOMATIC',
}

registerEnumType(Cartransmission, {
	name: 'Cartransmission',
});

// 🔋 Yoqilg‘i turi (Fuel type)
export enum FuelType {
	PETROL = 'PETROL',
	DIESEL = 'DIESEL',
	ELECTRIC = 'ELECTRIC',
	HYBRID = 'HYBRID',
	LPG = 'LPG',
	OTHER = 'OTHER',
}
registerEnumType(FuelType, {
	name: 'FuelType',
});

// ⚙️ Drivetrain (Driver type)
export enum DriverType {
	FWD = 'FWD', // Front Wheel Drive
	RWD = 'RWD', // Rear Wheel Drive
	AWD = 'AWD', // All Wheel Drive
	FOUR_WD = '4WD', // 4 Wheel Drive
}
registerEnumType(DriverType, {
	name: 'DriverType',
});

// 👤 Ownership (egalik tartibi)
export enum Ownership {
	FIRST = 'FIRST',
	SECOND = 'SECOND',
	THIRD_OR_MORE = 'THIRD_OR_MORE',
}
registerEnumType(Ownership, {
	name: 'Ownership',
});
