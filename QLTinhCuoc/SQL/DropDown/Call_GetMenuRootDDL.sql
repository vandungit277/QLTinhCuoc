USE PowerCall
GO
/*
Author: Dungdv24
Desc: 10/11/2018
Desc: Lấy thông tin Menu chính
*/
ALTER PROCEDURE Call_GetMenuRootDDL
AS
BEGIN
SELECT * FROM dbo.MenuRoot(NOLOCK) WHERE Status =1
END




