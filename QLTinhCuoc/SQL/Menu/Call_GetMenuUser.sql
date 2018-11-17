USE PowerCall
GO
/*
Author: Dungdv24
Desc: 17/11/2018
Desc: Lấy danh sách Menu Theo User
*/
CREATE PROCEDURE Call_GetMenuUser
    @Search INT , --0 Theo tất cả,1 Theo MenuRootID
    @MenuRootID VARCHAR(10) ,
    @UserName VARCHAR(30)
AS
    BEGIN
        DECLARE @StaffID VARCHAR(10);
        SELECT  @StaffID = StaffID
        FROM    dbo.Staff(NOLOCK)
        WHERE   UserName = @UserName;

        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 '
        IF @Search = 1 --Người dùng
            BEGIN
                SET @qr = N' AND MR.MenuRootID = ' + @MenuRootID
            END
        DECLARE @query NVARCHAR(MAX) = N'
SELECT  M.MenuID,M.MenuName,ISNULL(UM.Status,0) AS [Status]
FROM    dbo.MenuRoot AS MR
        JOIN dbo.Menu AS M ON M.MenuRootID = MR.MenuRootID
		LEFT JOIN (SELECT * FROM dbo.UserMenu(NOLOCK) WHERE StaffID= '+@StaffID+' )  AS UM ON UM.MenuID = M.MenuID
WHERE   MR.Status = 1
     ' + @qr
        PRINT @query
        IF EXISTS ( SELECT  1
                    FROM    dbo.Staff(NOLOCK)
                    WHERE   UserName = @UserName )
            BEGIN

                EXEC sp_executesql @query 
            END
        ELSE
            BEGIN
                SELECT  @query = @query + N' And 5 =4';
                EXEC sp_executesql @query 
            END
    END

/*
EXEC dbo.Call_GetMenuUser @Search = 1, -- int
    @MenuRootID = 1 ,-- int
	@UserName ='thanhtt'
*/
