INSERT INTO dbo.Staff
        ( SexID ,
          DepartmentID ,
          Status ,
          StaffName ,
          Birthdays ,
          Address ,
          Passport ,
          DayIn ,
          RoleID ,
          UserName ,
          Password
        )
VALUES  ( 1 , -- SexID - int
          1 , -- DepartmentID - int
          1 , -- Status - int
          N'Đặng Văn Dũng' , -- StaffName - nvarchar(150)
           GETDATE()-8500 , -- Birthdays - datetime
          N'142 Nguyễn Thị Thập,Q.7' , -- Address - nvarchar(250)
          '285506706' , -- Passport - varchar(50)
           GETDATE()-490 , -- DayIn - datetime
          3, -- RoleID - int
          'Dungdv24' , -- UserName - varchar(50)
          '123456'  -- Password - varchar(1000)
        )
--select * from sex(nolock)
--SELECT * FROM dbo.Role(NOLOCK)

INSERT INTO dbo.Staff
        ( SexID ,
          DepartmentID ,
          Status ,
          StaffName ,
          Birthdays ,
          Address ,
          Passport ,
          DayIn ,
          RoleID ,
          UserName ,
          Password
        )
VALUES  ( 1 , -- SexID - int
          1 , -- DepartmentID - int
          1 , -- Status - int
          N'Admin' , -- StaffName - nvarchar(150)
           GETDATE()-8500 , -- Birthdays - datetime
          N'142 Nguyễn Thị Thập,Q.7' , -- Address - nvarchar(250)
          '196632585' , -- Passport - varchar(50)
           GETDATE()-490 , -- DayIn - datetime
          3, -- RoleID - int
          'Admin' , -- UserName - varchar(50)
          '123456'  -- Password - varchar(1000)
        )
INSERT INTO dbo.Staff
        ( SexID ,
          DepartmentID ,
          Status ,
          StaffName ,
          Birthdays ,
          Address ,
          Passport ,
          DayIn ,
          RoleID ,
          UserName ,
          Password
        )
VALUES  ( 2 , -- SexID - int
          1 , -- DepartmentID - int
          1 , -- Status - int
          N'Triệu Thị Thanh' , -- StaffName - nvarchar(150)
           GETDATE()-8500 , -- Birthdays - datetime
          N'142 Nguyễn Thị Thập,Q.7' , -- Address - nvarchar(250)
          '196632525' , -- Passport - varchar(50)
           GETDATE()-490 , -- DayIn - datetime
          3, -- RoleID - int
          'thanhtt' , -- UserName - varchar(50)
          'qqPRPHJ4V87RnhULaS3D2fGxFwlAJEh/RPou2qyK9UU='  -- Password - varchar(1000)
        )
INSERT INTO dbo.Staff
        ( SexID ,
          DepartmentID ,
          Status ,
          StaffName ,
          Birthdays ,
          Address ,
          Passport ,
          DayIn ,
          RoleID ,
          UserName ,
          Password
        )
VALUES  ( 2 , -- SexID - int
          1 , -- DepartmentID - int
          1 , -- Status - int
          N'Trần Quan Giàu' , -- StaffName - nvarchar(150)
           GETDATE()-8500 , -- Birthdays - datetime
          N'900 Huỳnh Tấn Phát,Q.7' , -- Address - nvarchar(250)
          '196622525' , -- Passport - varchar(50)
           GETDATE()-490 , -- DayIn - datetime
          3, -- RoleID - int
          'giautq' , -- UserName - varchar(50)
          'qqPRPHJ4V87RnhULaS3D2fGxFwlAJEh/RPou2qyK9UU='  -- Password - varchar(1000)
        )