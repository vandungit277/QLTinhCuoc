/*
Author:Dungdv24
Desc: Get MenuRoot
*/


ALTER PROC Call_GetMenuRoot
@UserName VARCHAR(100)
AS
BEGIN
DECLARE @StaffID INT
SELECT  TOP 1 @StaffID = StaffID FROM dbo.Staff(NOLOCK) WHERE UserName = @UserName

DECLARE @Temp TABLE (MenuRootID INT ,MenuRootName NVARCHAR(250))
INSERT INTO @Temp
        ( MenuRootID, MenuRootName )
SELECT DISTINCT MR.MenuRootID,MR.MenuRootName FROM(
SELECT * FROM dbo.GroupStaffDetail(NOLOCK) WHERE StaffID = @StaffID) AS GS
JOIN dbo.Groups AS G ON G.GroupsID = gs.GroupsID
JOIN dbo.GroupsMenu AS GM ON GM.GroupsID = G.GroupsID
JOIN dbo.Menu AS M ON M.MenuID = GM.MenuID
JOIN dbo.MenuRoot AS MR ON MR.MenuRootID = M.MenuRootID
WHERE GM.Status =1 AND MR.Status =1

INSERT INTO @Temp
        ( MenuRootID, MenuRootName )
SELECT DISTINCT MR.MenuRootID,MR.MenuRootName FROM (
SELECT * FROM dbo.UserMenu(NOLOCK) WHERE StaffID = @StaffID) AS UM
JOIN dbo.Menu AS M ON M.MenuID = UM.MenuID
JOIN dbo.MenuRoot AS MR ON MR.MenuRootID = M.MenuRootID
WHERE MR.Status = 1 AND UM.Status = 1
SELECT DISTINCT * FROM @Temp;
END




--EXEC dbo.Call_GetMenuRoot @UserName = 'duonglh7' -- varchar(100)
