CREATE TABLE #temp (Name NVARCHAR(100),Code INT)
INSERT INTO #temp
        ( Name, Code )
Select N'An Giang' as [Name], '0296' as [Code] UNION
Select N'Bà Rịa - Vũng Tàu' as [Name], '0254' as [Code] UNION
Select N'Bắc Cạn' as [Name], '0209' as [Code] UNION
Select N'Bắc Giang' as [Name], '0204' as [Code] UNION
Select N'Bạc Liêu' as [Name], '0291' as [Code] UNION
Select N'Bắc Ninh' as [Name], '0222' as [Code] UNION
Select N'Bến Tre' as [Name], '0275' as [Code] UNION
Select N'Bình Định' as [Name], '0256' as [Code] UNION
Select N'Bình Dương' as [Name], '0274' as [Code] UNION
Select N'Bình Phước' as [Name], '0271' as [Code] UNION
Select N'Bình Thuận' as [Name], '0252' as [Code] UNION
Select N'Cà Mau' as [Name], '0290' as [Code] UNION
Select N'Cần Thơ' as [Name], '0292' as [Code] UNION
Select N'Cao Bằng' as [Name], '0206' as [Code] UNION
Select N'Đà Nẵng' as [Name], '0236' as [Code] UNION
Select N'Đắk Lắk' as [Name], '0262' as [Code] UNION
Select N'Đắk Nông' as [Name], '0261' as [Code] UNION
Select N'Điện Biên' as [Name], '0215' as [Code] UNION
Select N'Đồng Nai' as [Name], '0251' as [Code] UNION
Select N'Đồng Tháp' as [Name], '0277' as [Code] UNION
Select N'Gia Lai' as [Name], '0269' as [Code] UNION
Select N'Hà Giang' as [Name], '0219' as [Code] UNION
Select N'Hà Nam' as [Name], '0226' as [Code] UNION
Select N'Hà Nội' as [Name], '024' as [Code] UNION
Select N'Hà Tĩnh' as [Name], '0239' as [Code] UNION
Select N'Hải Dương' as [Name], '0220' as [Code] UNION
Select N'Hải Phòng' as [Name], '0225' as [Code] UNION
Select N'Hậu Giang' as [Name], '0293' as [Code] UNION
Select N'Hồ Chí Minh' as [Name], '028' as [Code] UNION
Select N'Hòa Bình' as [Name], '0218' as [Code] UNION
Select N'Hưng Yên' as [Name], '0221' as [Code] UNION
Select N'Khánh Hoà' as [Name], '0258' as [Code] UNION
Select N'Kiên Giang' as [Name], '0297' as [Code] UNION
Select N'Kon Tum' as [Name], '0260' as [Code] UNION
Select N'Lai Châu' as [Name], '0213' as [Code] UNION
Select N'Lâm Đồng' as [Name], '0263' as [Code] UNION
Select N'Lạng Sơn' as [Name], '0205' as [Code] UNION
Select N'Lào Cai' as [Name], '0214' as [Code] UNION
Select N'Long An' as [Name], '0272' as [Code] UNION
Select N'Nam Định' as [Name], '0228' as [Code] UNION
Select N'Nghệ An' as [Name], '0238' as [Code] UNION
Select N'Ninh Bình' as [Name], '0229' as [Code] UNION
Select N'Ninh Thuận' as [Name], '0259' as [Code] UNION
Select N'Phú Thọ' as [Name], '0210' as [Code] UNION
Select N'Phú Yên' as [Name], '0257' as [Code] UNION
Select N'Quảng Bình' as [Name], '0232' as [Code] UNION
Select N'Quảng Nam' as [Name], '0235' as [Code] UNION
Select N'Quảng Ngãi' as [Name], '0255' as [Code] UNION
Select N'Quảng Ninh' as [Name], '0203' as [Code] UNION
Select N'Quảng Trị' as [Name], '0233' as [Code] UNION
Select N'Sóc Trăng' as [Name], '0299' as [Code] UNION
Select N'Sơn La' as [Name], '0212' as [Code] UNION
Select N'Tây Ninh' as [Name], '0276' as [Code] UNION
Select N'Thái Bình' as [Name], '0227' as [Code] UNION
Select N'Thái Nguyên' as [Name], '0208' as [Code] UNION
Select N'Thanh Hóa' as [Name], '0237' as [Code] UNION
Select N'Huế' as [Name], '0234' as [Code] UNION
Select N'Tiền Giang' as [Name], '0273' as [Code] UNION
Select N'Trà Vinh' as [Name], '0294' as [Code] UNION
Select N'Tuyên Quang' as [Name], '0207' as [Code] UNION
Select N'Vĩnh Long' as [Name], '0270' as [Code] UNION
Select N'Vĩnh Phúc' as [Name], '0211' as [Code] UNION
Select N'Yên Bái' as [Name], '0216' as [Code] 
 
INSERT dbo.FixedDial
        ( LocationID ,
          PostalCode ,
          Description ,
          TypeFixedDialID ,
          Status,
		  CreateBy
        )
SELECT LocationID,'0'+CONVERT(VARCHAR(10),Code) AS PostalCode ,Name,1,1,'System' FROM #temp AS l
LEFT JOIN  dbo.Location AS t ON t.LocationName = l.Name






SELECT * FROM dbo.FixedDial










