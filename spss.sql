drop database spss;

CREATE DATABASE  spss;

use spss;

SET FOREIGN_KEY_CHECKs=0;
SET GLOBAL FOREIGN_KEY_CHECKs=0; 

create table students(
    student_id int auto_increment primary key,
    student_name varchar(50),
    student_email varchar(50),
    student_password varchar(50),
    paper_balance int default 0
);

create table paper_transactions(
    transaction_id int auto_increment primary key,
    student_id int,
    transaction_date date,
    transaction_amount int default 0
);

alter table paper_transactions
add constraint foreign key (student_id) references students(student_id);


create table documents(
    `file_id` int auto_increment primary key,
    `file_name` varchar(255),
    file_size int,
    file_type varchar(50),
    no_of_pages int
);

create table printers(
    printer_id int auto_increment primary key,
    `status` boolean,
    `location` varchar(50),
    paper_left int,
    printer_type varchar(50)
);

create table spso(
    spso_id int auto_increment primary key,
    spso_name varchar(50),
    spso_password varchar(50)
);

create table printer_config(
    printer_id int,
    spso_id int,
    `time` datetime, 
    constraint primary key (printer_id, spso_id)
);

alter table printer_config
add constraint foreign key (printer_id) references printers(printer_id),
add constraint foreign key (spso_id) references spso(spso_id);

create table sys_config(
    sys_config_id int auto_increment primary key,
    default_time datetime,
    default_paper int,
    `time` datetime,
    default_number_of_pages int,
    spso_id int
);

alter table sys_config
add constraint foreign key (spso_id) references spso(spso_id);

create table file_type(
    file_type_id int primary key,
    file_type varchar(50),
    sys_config_id int
);

alter table file_type
add constraint foreign key (sys_config_id) references sys_config(sys_config_id);

create table print_orders(
    student_id int,
    `file_id` int,
    printer_id int,
    `time` datetime,
    side char(1),
    no_of_copies int,
    pages_per_sheet int,
    orientation enum('portrait','landscape'),
    page_size enum('A4', 'A3'),
    left_margin int,
    right_margin int,
    top_margin int,
    bottom_margin int,
    page_from int,
    page_to int,
    primary key (student_id, `file_id`),
    constraint sk1 unique (printer_id, `file_id`)
);

alter table print_orders
add constraint foreign key (student_id) references students(student_id),
add constraint foreign key (`file_id`) references documents(`file_id`),
add constraint foreign key (printer_id) references printers(printer_id);

insert into students(student_email, student_name, student_password) VALUES
('lytuanloc@gmail.com','Ly Tuan Loc','123456'),
('lytrieuuy@gmail.com','Ly Trieu Uy','123456'),
('nguyenanhkhoa@gmail.com','Ly Tuan Loc','123456'),
('lethiphuongthao@gmail.com','Ly Tuan Loc','123456'),
('lequangcuong@gmail.com','Ly Tuan Loc','123456');

insert into spso(spso_name, spso_password) VALUES
('admin1','123456'),
('admin2','123456'),
('admin3','123456');

insert into printers(`status`, `location`, paper_left, printer_type) VALUES
('1','A4-503',100,'A4'),
('1','B4-202',100,'A4'),
('1','C4-403',100,'A4'),
('1','C6-103',100,'A4'),
('1','Library',100,'A4'),
('1','C5-301',100,'A4'),
('1','B1-302',100,'A4');

insert into documents(`file_name`, file_size, file_type, no_of_pages) VALUES
('file1',100,'pdf',10),
('file2',200,'doc',20),
('file3',300,'pdf',30),
('file4',400,'doc',40),
('file5',500,'pdf',50),
('file6',600,'doc',60),
('file7',700,'pdf',70),
('file8',800,'doc',80),
('file9',900,'pdf',90),
('file10',1000,'doc',100),
('file11',1100,'pdf',110),
('file12',1200,'doc',120),
('file13',1300,'pdf',130),
('file14',1400,'doc',140),
('file15',1500,'pdf',150),
('file16',1600,'doc',160),
('file17',1700,'pdf',170),
('file18',1800,'doc',180),
('file19',1900,'pdf',190),
('file20',2000,'doc',200);

insert into paper_transactions(student_id, transaction_date, transaction_amount) VALUES
(1,'2024-01-01',100),
(1,'2024-01-01',100),
(1,'2024-01-01',100),
(1,'2024-01-01',100),
(2,'2024-01-01',100),
(3,'2024-01-01',100),
(4,'2024-01-01',100),
(5,'2024-01-01',100);

insert into print_orders(student_id, `file_id`, printer_id, `time`, side, no_of_copies, pages_per_sheet, orientation, page_size, left_margin, right_margin, top_margin, bottom_margin, page_from, page_to) VALUES
(1,1,1,'2024-07-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,2,1,'2024-07-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,3,1,'2024-08-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,4,1,'2024-08-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,5,1,'2024-08-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,6,1,'2024-09-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,7,1,'2024-09-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,8,1,'2024-09-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,9,1,'2024-09-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,10,1,'2024-10-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,11,1,'2024-10-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,12,1,'2024-11-01','1',1,1,'portrait','A4',1,1,1,1,1,20),
(1,13,1,'2024-11-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,14,1,'2024-11-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,15,1,'2024-11-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,16,1,'2024-11-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,17,1,'2024-12-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,18,1,'2024-12-01','1',1,1,'portrait','A4',1,1,1,1,1,10),
(1,19,1,'2024-12-01','1',1,1,'portrait','A4',1,1,1,1,1,10);

-- procedure student information
-- select count(*), sum(no_of_pages)
-- from students s, print_orders o, documents d
-- where s.student_id = o.student_id and
-- d.file_id = o.file_id;

-- select paper_balance
-- from students
-- where student_id = 1;

-- select count(*)
-- from students s, paper_transactions p
-- where s.student_id = p.student_id;


delimiter //
create procedure student_procedure(student_id int)
deterministic
begin
SELECT 
    -- Total number of print orders
    COUNT(*) AS total_print_orders,
    
    -- Total number of pages printed across all orders
    SUM(d.no_of_pages) AS total_pages_printed,
    
    -- Current paper balance for a specific student (in this case, student_id = 1)
    (SELECT paper_balance 
     FROM students s
     WHERE s.student_id = student_id) AS student_paper_balance,
    
    -- Total number of paper transactions
    (SELECT COUNT(*) 
     FROM students s , paper_transactions p where s.student_id = student_id and s.student_id = p.student_id) AS total_paper_transactions
FROM 
    students s,
    print_orders o,
    documents d
	where s.student_id = student_id 
	and s.student_id = o.student_id
	and d.file_id = o.file_id;
end //
delimiter ;

-- call student_procedure(1);

delimiter //
create procedure student_order(student_id int)
deterministic
begin
	select count(*) as counter, date_format(o.`time`, '%Y-%m') as order_month
	from students s, print_orders o
	where s.student_id = student_id and s.student_id = o.student_id
	group by date_format(o.`time`, '%Y-%m')
	order by order_month;
end //
delimiter ;

-- call student_order(1);