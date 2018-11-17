USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Cấp/cắt quyền user
*/
ALTER PROCEDURE Call_IUMenuUser
    @UserName VARCHAR(30) ,
    @MenuID INT ,
    @Status INT ,
    @UpdateBy VARCHAR(30)
AS
    BEGIN
        DECLARE @StaffID INT

        SELECT  @StaffID = StaffID
        FROM    dbo.Staff(NOLOCK)
        WHERE   UserName = @UserName

        IF EXISTS ( SELECT  1
                    FROM    dbo.UserMenu(NOLOCK)
                    WHERE   StaffID = @StaffID
                            AND MenuID = @MenuID )
            BEGIN
                UPDATE  dbo.UserMenu
                SET     Status = @Status
                WHERE   StaffID = @StaffID
                        AND MenuID = @MenuID
            END
        ELSE
            BEGIN
                INSERT  INTO dbo.UserMenu
                        ( StaffID ,
                          MenuID ,
                          Status ,
                          CreateDate ,
                          StaffUpdate
                        )
                VALUES  ( @StaffID , -- StaffID - int
                          @MenuID , -- MenuID - int
                          @Status , -- Status - int
                          GETDATE() , -- CreateDate - datetime
                          @UpdateBy  -- StaffUpdate - varchar(50)
                        )
            END
        IF @@ROWCOUNT > 0
            BEGIN
                SELECT  1 AS [Code] ,
                        N'Cập nhật thành công' AS [Desc];
            END
        ELSE
            BEGIN
                SELECT  0 AS [Code] ,
                        N'Cập nhật thất bại' AS [Desc];
            END


    END

