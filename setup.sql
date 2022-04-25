/*SETUP*/

create table category(id number(3) generated always as identity cache 30, name varchar(20) not null, constraint category_name unique (name), primary key (id));

create table task(id number(3) generated always as identity cache 30, description varchar(40) not null, dueDate date, categoryId number(3) not null, constraint category_fk foreign key (categoryId) references category(id), primary key (id));

insert into category (name) values('general');

insert into category (name) values('work');

insert into category (name) values('school');

insert into task (description, dueDate, categoryId) values ('asiakastapaaminen', to_date ('2022-04-11 14:30:00', 'YYYY-MM-DD HH24:MI:SS'), 2);

insert into task (description, dueDate, categoryId) values ('osta maitoa', date '2022-11-10', 1);

insert into task (description, dueDate, categoryId) values ('tehtava deadline', to_date ('11-05-2022 14:30:00', 'DD-MM-YYYY HH24:MI:SS'), 3);

/*QUERIES*/

delete from task where id=10;

select * from task where categoryId=1;

select * from task where duedate = to_date('2022-11-10', 'yyyy-mm-dd');

select * from task where trunc(duedate) = date '2022-05-11';

select * from task where trunc(duedate) = to_date ('11-04-2022', 'dd-mm-yyyy');


select * from task where trunc(duedate) = date '2022-04-21T11:04:28.580Z';


/*OTHER*/

insert into timest values(to_timestamp('02-01-1994 14:33:00', 'DD-MM-YYYY HH24:MI:SS'));

insert into timest values(timestamp '2022-04-07 14:33:00 EET');

insert into datet values(to_date('02-01-1994 14:33:00', 'DD-MM-YYYY HH24:MI:SS'));
