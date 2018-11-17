USE PowerCall
go
/*
Author: Dungdv24
Date: 1/11/2018
*/

ALTER PROC Call_GetMenu
@UserName VARCHAR(100),
@MenuRootID INT
AS
BEGIN
DECLARE @StaffID INT
SELECT  TOP 1 @StaffID = StaffID FROM dbo.Staff(NOLOCK) WHERE UserName = @UserName

DECLARE @Temp TABLE (MenuID INT ,MenuName NVARCHAR(250),Description NVARCHAR(500),Url varchar(100))
INSERT INTO @Temp
        ( MenuID, MenuName,DESCRIPTION,Url )
SELECT DISTINCT M.MenuID,M.MenuName,M.Description,M.URL FROM(
SELECT * FROM dbo.GroupStaffDetail(NOLOCK) WHERE StaffID = @StaffID) AS GS
JOIN dbo.Groups AS G ON G.GroupsID = gs.GroupsID
JOIN dbo.GroupsMenu AS GM ON GM.GroupsID = G.GroupsID
JOIN dbo.Menu AS M ON M.MenuID = GM.MenuID
JOIN dbo.MenuRoot AS MR ON MR.MenuRootID = M.MenuRootID
WHERE MR.MenuRootID=@MenuRootID AND GM.Status =1;
INSERT INTO @Temp
         ( MenuID, MenuName,DESCRIPTION,Url )
SELECT DISTINCT M.MenuID,M.MenuName,M.Description,M.URL FROM (
SELECT * FROM dbo.UserMenu(NOLOCK) WHERE StaffID = @StaffID) AS UM
JOIN dbo.Menu AS M ON M.MenuID = UM.MenuID
JOIN dbo.MenuRoot AS MR ON MR.MenuRootID = M.MenuRootID
WHERE MR.MenuRootID=@MenuRootID AND UM.Status =1;
SELECT DISTINCT * FROM @Temp;
END

/*
EXEC dbo.Call_GetMenu @UserName = 'admin', -- varchar(100)
    @MenuRootID = 7 -- int
*/
