USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Thêm mới đầu số
*/
ALTER PROCEDURE Call_NewFixedDial
    @LocationID INT ,
    @PostalCode VARCHAR(30) ,
    @Description NVARCHAR(500) ,
    @TypeFixedDialID INT ,
    @CreateBy VARCHAR(30) ,
    @Status INT
AS
    BEGIN
        DECLARE @StaffID INT ,
            @Code INT ,
            @Desc NVARCHAR(500);
        IF  EXISTS (SELECT 1 FROM dbo.FixedDial(NOLOCK) WHERE PostalCode = @PostalCode)
            BEGIN
		
                SET @Code = -1;
                SET @Desc = N'Đầu số: '+@PostalCode +N' đã tồn tại';
                GOTO result;
            END
        INSERT  INTO dbo.FixedDial
                ( LocationID ,
                  PostalCode ,
                  Description ,
                  TypeFixedDialID ,
                  CreateBy ,
                  Status
                )
        VALUES  ( @LocationID , -- LocationID - int
                  @PostalCode , -- PostalCode - varchar(30)
                  @Description , -- Description - nvarchar(500)
                  @TypeFixedDialID , -- TypeFixedDialID - int
                  @CreateBy , --CreateBy - varchar(30)
                  @Status  -- Status - int
                )
        IF @@ROWCOUNT > 0
            BEGIN
                SET @Code = 1;
                SET @Desc = N'Thêm mới: '+@PostalCode+N' thành công';
            END
        ELSE
            BEGIN
                SET @Code = 0;
                SET @Desc = N'Thêm mới: '+@PostalCode+N' thất bại';
            END
        result:
        BEGIN
            SELECT  @Code AS [Code] ,
                    @Desc AS [Desc]
        END
    END





	