USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Thêm mới giá cước
*/
ALTER PROCEDURE Call_NewServiceCharge
    @TypeCallID INT ,
    @ServiceProviderID INT ,
    @block1 INT ,
    @price1 FLOAT ,
    @block2 INT ,
    @price2 FLOAT ,
    @Status INT ,
    @UpdateBy VARCHAR(50)
AS
    BEGIN
        DECLARE @StaffID INT ,
            @Code INT ,
            @Desc NVARCHAR(500);
        IF NOT EXISTS ( SELECT  1
                        FROM    dbo.ServiceProvider
                        WHERE   ServiceProviderID = @ServiceProviderID )
            BEGIN
                SET @Code = -1;
                SET @Desc = N'Nhà cung cấp không tồn tại';
                GOTO result;
            END
        IF NOT EXISTS ( SELECT  1
                        FROM    dbo.TypeCall
                        WHERE   TypeCallID = @TypeCallID )
            BEGIN
                SET @Code = -2;
                SET @Desc = N'Loại dịch vụ không tồn tại';
                GOTO result;
            END

        INSERT  INTO dbo.ServiceCharge
                ( TypeCallID ,
                  ServiceProviderID ,
                  block1 ,
                  price1 ,
                  block2 ,
                  price2 ,
                  Status ,
                  UpdateBy
                )
        VALUES  ( @TypeCallID , -- TypeCallID - int
                  @ServiceProviderID , -- ServiceProviderID - int
                  @block1 , -- block1 - int
                  CAST(ROUND(@price1, 2) AS FLOAT) , -- price1 - float
                  @block2 , -- block2 - int
                  CAST(ROUND(@price2, 2) AS FLOAT)  , -- price2 - float
                  @Status , -- Status - int
                  @UpdateBy  -- UpdateBy - varchar(50)
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

