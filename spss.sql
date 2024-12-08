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
    transaction_type varchar(50),
    transaction_amount int,
    transaction_balance int
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
    status boolean,
    location varchar(50),
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
