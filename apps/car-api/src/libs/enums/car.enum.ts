import { registerEnumType } from '@nestjs/graphql';

export enum CarBrand {
	TOYOTA = 'TOYOTA',
	HYUNDAI = 'HYUNDAI',
	KIA = 'KIA',
	TESLA = 'TESLA',
	BMW = 'BMW',
	MERCEDES = 'MERCEDES',
	AUDI = 'AUDI',
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
}

registerEnumType(CarType, {
	name: 'CarType',
});


export enum CarStatus {
	AVAILABLE = 'AVAILABLE',   // hozir bo‘sh, ijaraga olish mumkin
	RENTED = 'RENTED',         // hozir band
	MAINTENANCE = 'MAINTENANCE' // ta’mirda, vaqtincha ishlamaydi
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