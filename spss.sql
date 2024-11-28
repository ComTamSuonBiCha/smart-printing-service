CREATE DATABASE  spss;

use spss;

create table students(
    student_id int primary key,
    student_name varchar(50),
    paper_balance int default 0,
    password varchar(50)
);

create table paper_transactions(
    transaction_id int primary key,
    student_id int,
    transaction_date date,
    transaction_type varchar(50),
    transaction_amount int,
    transaction_balance int
);

alter table paper_transactions
add constraint foreign key (student_id) references students(student_id);

create table documents(
    `file_id` int primary key,
    `file_name` varchar(255),
    file_size int,
    file_type varchar(50),
    no_of_pages int,
);

create table printer(
    printer_id int primary key,
    status boolean,
    location varchar(50),
    paper_left int,
    printer_type varchar(50)   
);

create table spso(
    spso_id int primary key,
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
add constraint foreign key (printer_id) references printer(printer_id),
add constraint foreign key (spso_id) references spso(spso_id);

create table sys_config(
    sys_config_id int primary key,
    default_time datetime,
    default_paper int,
    `time` datetime,
    default_number_of_pages int,
);

create table file_type(
    file_type_id int primary key,
    file_type varchar(50),
    sys_config_id int
);

alter table file_type
add constraint foreign key (sys_config_id) references sys_config(sys_config_id);

create table print_order(
    student_id int,
    `file_id` int,
    printer_id int,
    `time` datetime,
    side char(1),
    no_of_copies int,
    pages_per_sheet int,
    orientation (portrait, landscape),
    page_size (A4, A3),
    left_margin int,
    right_margin int,
    top_margin int,
    bottom_margin int,
    page_from int,
    page_to int,
    primary key (student_id, `file_id`),
    constraint sk1 unique (printer_id, `file_id`)
);

alter table print_order
add constraint foreign key student_id references students(student_id),
add constraint foreign key `file_id` references documents(`file_id`),
add constraint foreign key printer_id references printer(printer_id);
