


INSERT INTO dbo.Company
        ( CompanyName ,
		  CompanyFullName,
          FoundedYear ,
          Address ,
          Description ,
          TaxCode
        )
VALUES  ( N'FPT TELECOM' , -- CompanyName - nvarchar(250)
		  N'Công Ty Cổ Phần Viễn Thông Fpt'			,
          '09-21-2005' , -- FoundedYear - datetime
          N'Tầng 2, tòa nhà FPT Cầu Giấy, phố Duy Tân - Phường Dịch Vọng Hậu - Quận Cầu Giấy - Hà Nội' , -- Address - nvarchar(500)
          N'Công Ty Cổ Phần Viễn Thông Fpt - FPT TELECOM có địa chỉ tại Tầng 2, tòa nhà FPT Cầu Giấy, phố Duy Tân - Phường Dịch Vọng Hậu - Quận Cầu Giấy - Hà Nội. Mã số thuế 0101778163 Đăng ký & quản lý bởi Cục Thuế Thành phố Hà Nội' , -- Description - nvarchar(500)
          '0101778163'  -- TaxCode - varchar(100)
        )





INSERT INTO dbo.Company
        ( CompanyName ,
		  CompanyFullName,
          FoundedYear ,
          Address ,
          Description ,
          TaxCode
        )
VALUES  ( N'FTI' , -- CompanyName - nvarchar(250)
		  N'CÔNG TY TNHH MỘT THÀNH VIÊN VIỄN THÔNG QUỐC TẾ FPT'			,
          '05/22/2008' , -- FoundedYear - datetime
          N'Lô L.29B-31B-33B đường Tân Thuận, Khu chế xuất Tân Thuận, Phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh' , -- Address - nvarchar(500)
          N'' , -- Description - nvarchar(500)
          '0305793402'  -- TaxCode - varchar(100)
        )

INSERT INTO dbo.Company
        ( CompanyName ,
		  CompanyFullName,
          FoundedYear ,
          Address ,
          Description ,
          TaxCode
        )
VALUES  ( N'FTS' , -- CompanyName - nvarchar(250)
		  N'CÔNG TY CỔ PHẦN DỊCH VỤ VIỄN THÔNG FTS'			,
          '06/08/2006' , -- FoundedYear - datetime
          N'Số 36 phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội' , -- Address - nvarchar(500)
          N'' , -- Description - nvarchar(500)
          '0101982793'  -- TaxCode - varchar(100)
        )

		SELECT * FROM dbo.Company