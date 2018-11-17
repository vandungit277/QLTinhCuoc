USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Thêm mới nhân viên
*/
ALTER PROCEDURE Call_NewStaff
    @DepartmentID INT ,
    @SexID INT ,
    @RoleID INT ,
    @StaffName NVARCHAR(150) ,
    @Birthdays DATE ,
    @Address NVARCHAR(250) ,
    @Status INT ,
    @DayIn DATE ,
    @Passport VARCHAR(50) ,
    @UserName VARCHAR(50) ,
    @Password VARCHAR(1000) ,
    @Email VARCHAR(100) ,
    @PhoneNumber VARCHAR(30) ,
    @CreateBy VARCHAR(30)
AS
    BEGIN
        DECLARE @Code INT ,
            @Desc NVARCHAR(500);
        IF EXISTS ( SELECT  1
                    FROM    dbo.Staff(NOLOCK)
                    WHERE   UserName = @UserName )
            BEGIN
                SET @Code = -1;
                SET @Desc = N'Tài khoản này đã có người sử dụng';
                GOTO result;
            END
        IF EXISTS ( SELECT  1
                    FROM    dbo.Staff(NOLOCK)
                    WHERE   Email = @Email )
            BEGIN
                SET @Code = -2;
                SET @Desc = N'Email này đã có người sử dụng';
                GOTO result;
            END
        IF EXISTS ( SELECT  1
                    FROM    dbo.Staff(NOLOCK)
                    WHERE   Passport = @Passport )
            BEGIN
                SET @Code = -3;
                SET @Desc = N'CMND đã tồn tại';
                GOTO result;
            END
        IF ISNULL(@CreateBy,'')=''
            BEGIN
                SET @Code = -4;
                SET @Desc = N'Hết Session vui lòng đăng nhập lại';
                GOTO result;
            END
        INSERT  INTO dbo.Staff
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
                  Password ,
                  Email ,
                  PhoneNumber ,
                  CreateBy
                )
        VALUES  ( @SexID , -- SexID - int
                  @DepartmentID , -- DepartmentID - int
                  @Status , -- Status - int
                  @StaffName , -- StaffName - nvarchar(150)
                  @Birthdays , -- Birthdays - datetime
                  @Address , -- Address - nvarchar(250)
                  @Passport , -- Passport - varchar(50)
                  @DayIn , -- DayIn - datetime
                  @RoleID , -- RoleID - int
                  @UserName , -- UserName - varchar(50)
                  @Password , -- Password - varchar(1000)
                  @Email , -- Email - varchar(100)
                  @PhoneNumber ,  -- PhoneNumber - varchar(30)
                  @CreateBy
                )

        IF @@ROWCOUNT > 0
            BEGIN
                SET @Code = 1;
                SET @Desc = N'Thêm mới thành công';
            END
        ELSE
            BEGIN
                SET @Code = 0;
                SET @Desc = N'Thêm mới thất bại';
            END
        result:
        BEGIN
            SELECT  @Code AS [Code] ,
                    @Desc AS [Desc]
        END
    END

