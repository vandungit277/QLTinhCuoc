INSERT dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Cước cuộc gọi Nội hạt', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          1  -- MenuRootID - int
          );
INSERT dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Cước cuộc gọi Liên tỉnh', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          1  -- MenuRootID - int
          );
INSERT dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Cước cuộc gọi Di động', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          1  -- MenuRootID - int
          );
INSERT dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Cước cuộc gọi Dịch vụ', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          1  -- MenuRootID - int
          );
-----------------------
--Báo cáo cước cuộc gọi
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Báo cáo tổng hợp', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2  -- MenuRootID - int
          );

INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Chi tiết cuộc gọi:', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2  -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Top cuộc gọi', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2 -- MenuRootID - int
          );
--Quản lý số nội bộ

INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Thông tin số nội bộ', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Công ty thành viên', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2 -- MenuRootID - int
          );

INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Theo cá nhân', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Thêm mới số nội bộ', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          2 -- MenuRootID - int
          );

INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Thêm mới nhà cung cấp', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          3 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Danh sách nhà cung cấp', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          3 -- MenuRootID - int
          );
--
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Thêm mới nhân viên', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          5 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Danh sách nhân viên', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          5 -- MenuRootID - int
          );
--
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Thêm mới đầu số', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          6 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Danh sách đầu số', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          6 -- MenuRootID - int
          );
--
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Cấp/cắt quyền Menu theo User', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          7 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Cấp/cắt quyền Menu theo Groups', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          7 -- MenuRootID - int
          );

INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Thêm mới Group', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          8 -- MenuRootID - int
          );
INSERT  dbo.Menu
        ( MenuName, Description, MenuRootID )
VALUES  ( N'Danh sách Groups', -- MenuName - nvarchar(250)
          N'', -- Description - nvarchar(500)
          8 -- MenuRootID - int
          );
--SELECT * FROM dbo.MenuRoot
/*
UPDATE dbo.Menu SET MenuName=N'Cấp/cắt quyền theo User' WHERE MenuID=18
UPDATE dbo.Menu SET MenuName=N'Cấp/cắt quyền theo Groups' WHERE MenuID=19
*/