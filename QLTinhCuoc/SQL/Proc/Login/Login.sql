/*
Author:Dungdv24
Desc: Login

*/

ALTER PROC Call_Login
    @UserName VARCHAR(100) ,
    @Password VARCHAR(200)
AS
    BEGIN

        IF EXISTS ( SELECT TOP 1
                            *
                    FROM    dbo.Staff(NOLOCK)
                    WHERE   UserName = @UserName
                            AND Password = @Password )
            BEGIN
                SELECT  1 AS Code ,
                        N'Đăng nhập thành công' AS [Desc]
            END
        ELSE
            BEGIN
                SELECT  0 AS Code ,
                        N'Tài khoản hoặc mật khẩu không đúng' AS [Desc]
            END

    END



	exec dbo.Call_Login @UserName=N'dungdv24',@Password=N'qqPRPHJ4V87RnhULaS3D2fGxFwlAJEh/RPou2qyK9UU='