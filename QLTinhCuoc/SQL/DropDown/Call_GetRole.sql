USE PowerCall
GO
/*
Author: Dungdv24
Desc:  10/11/2018
Desc: Lấy thông tin chức vụ
*/
ALTER PROCEDURE Call_GetRole
AS
BEGIN
SELECT RoleID,RoleName FROM dbo.Role(NOLOCK)
END

