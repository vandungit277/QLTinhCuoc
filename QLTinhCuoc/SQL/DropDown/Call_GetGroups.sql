USE PowerCall
GO
/*
Author: Dungdv24
Desc: 17/11/2018
Desc: Lấy danh sách Groups
*/
CREATE PROCEDURE Call_GetGroups
AS
BEGIN
SELECT GroupsID,GroupsName FROM dbo.Groups(NOLOCK) WHERE Status =1
END






