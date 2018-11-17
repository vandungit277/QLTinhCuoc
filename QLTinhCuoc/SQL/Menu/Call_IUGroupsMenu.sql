USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Cấp/cắt quyền Groups
*/
CREATE PROCEDURE Call_IUGroupsMenu
    @GroupsID INT,
    @MenuID INT ,
    @Status INT ,
    @UpdateBy VARCHAR(30)
AS
    BEGIN      
        IF EXISTS ( SELECT  1
                    FROM    dbo.GroupsMenu(NOLOCK)
                    WHERE   GroupsID = @GroupsID
                            AND MenuID = @MenuID )
            BEGIN
                UPDATE  dbo.GroupsMenu
                SET     Status = @Status
                WHERE   GroupsID = @GroupsID
                        AND MenuID = @MenuID
            END
        ELSE
            BEGIN
                INSERT  INTO dbo.GroupsMenu
                        ( MenuID ,
                          GroupsID ,
                          Status ,
                          CreateDate ,
                          StaffUpdate
                        )
                VALUES  ( @MenuID , -- MenuID - int
                          @GroupsID , -- GroupsID - int
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

