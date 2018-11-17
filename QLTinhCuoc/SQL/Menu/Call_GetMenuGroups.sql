USE PowerCall
GO
/*
Author: Dungdv24
Desc: 17/11/2018
Desc: Lấy danh sách Menu Theo Groups
*/
ALTER PROCEDURE Call_GetMenuGroups
    @Search INT , --0 Theo tất cả,1 Theo MenuRootID
    @MenuRootID VARCHAR(10) ,
    @GroupsID VARCHAR(30)
AS
    BEGIN
        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 '
        IF @Search = 1 --Người dùng
            BEGIN
                SET @qr = N' AND MR.MenuRootID = ' + @MenuRootID
            END
        DECLARE @query NVARCHAR(MAX) = N'
SELECT  M.MenuID,M.MenuName,ISNULL(GM.Status,0) AS [Status]
FROM    dbo.MenuRoot AS MR
        JOIN dbo.Menu AS M ON M.MenuRootID = MR.MenuRootID
		LEFT JOIN (SELECT * FROM dbo.GroupsMenu(NOLOCK) WHERE GroupsID= '+@GroupsID+' )  AS GM ON GM.MenuID = M.MenuID
WHERE   MR.Status = 1
     ' + @qr
        PRINT @query
        IF EXISTS ( SELECT  1
                    FROM    dbo.Groups(NOLOCK)
                    WHERE   GroupsID = @GroupsID )
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
EXEC dbo.Call_GetMenuGroups @Search = 0, -- int
    @MenuRootID = 1 ,-- int
	@GroupsID ='1'
*/
