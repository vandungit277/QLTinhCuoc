/*
Author: Dungdv24
Date: 06/11/2018
Desc: Lấy thông tin tài khoản.
*/

ALTER PROC Call_ChangePassword
@UserName VARCHAR(100),
@OldPassword VARCHAR(100),
@NewPassWord VARCHAR(100)
AS
BEGIN	
DECLARE @Code INT,@Desc NVARCHAR(100)

IF NOT EXISTS(SELECT 1 FROM dbo.Staff WHERE UserName = @UserName)
BEGIN
SET @Code = -1;
SET @Desc =N'Tài khoản không tồn tại trên hệ thống';
GOTO result;
END

IF NOT EXISTS (SELECT 1 FROM dbo.Staff WHERE UserName = @UserName AND Password = @OldPassword)
BEGIN
SET @Code = -2;
SET @Desc =N'Mật khẩu cũ không đúng';
goto result;
END
ELSE
BEGIN
	UPDATE dbo.Staff SET Password = @NewPassWord WHERE UserName = @UserName AND Password = @OldPassword;

	IF @@ROWCOUNT > 0
	BEGIN
	SET @Code = 1;
	SET @Desc =N'Đổi mật khẩu thành công';
	goto result;
	END
	ELSE
	BEGIN
	SET @Code = 0;
	SET @Desc =N'Đổi mật khẩu thất bại';
	goto result;
	END

	result:
	SELECT @Code AS [Code],@Desc AS [Desc];
	RETURN;
END


END



