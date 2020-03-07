import { DatabaseService } from '../../services/sqlite/database.service';
import { Area } from '../area';
export class AreaController {

    public areas = [];

    constructor(private database: DatabaseService) {
        setTimeout(() => {
            this.loadAreas();
            console.log('3');
        }, 0);

    }

    async loadAreas() {
        this.areas = await this.getAll();
        console.log('AC - Areas: ');
        console.log(this.areas);
    }

    public get getAreas() {
        return this.areas;
    }

    public save(area: Area) {
        if ( area.getId > 0 ) {
            return this.update(area);
        } else {
            return this.insert(area);
        }
    }

    public insert(area: Area) {
        const sql = 'insert into areas (name, description, x, y, width, height) values (?, ?, ?, ?, ?, ?) ';
        const data = [area.getName, area.getDescription, area.getX, area.getY, area.getWidth, area.getHeight];
        return this.database.executeSql(sql, data);
    }

    private update(area: Area) {
        const sql = 'update areas set name = ?, description = ?, x = ?, y = ?, width = ?, height = ? where id = ?';
        const data = [area.getName, area.getDescription, area.getX, area.getY, area.getWidth, area.getHeight, area.getId];
        // tslint:disable-next-line: max-line-length
        console.log(' nome: ? desc: ?, x: ?, y: ?, width: ?, height ?', 
        [area.getName, area.getDescription, area.getX, area.getY, area.getWidth, area.getHeight, area.getId]);

        return this.database.executeSql(sql, data);
    }

    delete(id: number) {
        const sql = 'delete from areas where id = ?';
        const data = [id];

        this.areas.forEach( area => {
            if (area.id == id ) {
                console.log('area a ser removida: ', area);
                this.areas.splice(this.areas.indexOf(area), 1);
                console.log('areas: ', this.areas)
            }
        })

        return this.database.executeSql(sql, data);
    }

    async getById(id: number) {
        const sql = 'select * from areas where id = ?';
        const data = [id];
        const result = await this.database.executeSql(sql, data);
        const rows = result.rows;
        let area: Area;
        if (rows && rows.length > 0) {
          const item = rows.item(0);
          area = new Area(item.id, item.name, item.description, item.x, item.y, item.width, item.height);
        }
        return area;
    }

    async getAll() {
        const sql = 'select * from areas';
        const result = await this.database.executeSql(sql);
        const areas = this.fillAreas(result.rows);
        return areas;
    }

    fillAreas(rows: any) {
        const areas: Area[] = [];
        for ( let i = 0; i < rows.length; i++ ) {
          const item = rows.item(i);
          const area = new Area(item.id, item.name, item.description, item.x, item.y, item.width, item.height);
          areas.push(area);
        }
        return areas;
    }

    async addArea(name: string, description: string,
                  initX: number, initY: number, endX: number, endY: number, deslX: number, deslY: number, mapScale: number) {

        console.log('ADD - initX: ');
        console.log(initX);

        /*
        const area = {
          name,
          description,
          x: initX < endX ? initX - deslX : endX - deslX,
          y: initY < endY ? initY - deslY : endY - deslY,
          width: endX > initX ? endX - initX : initX - endX,
          height: endY > initY ? endY - initY : initY - endY
        }; */

        const area: Area = new Area(
            undefined,
            name,
            description,
            initX < endX ? initX - deslX : endX - deslX,
            initY < endY ? initY - deslY : endY - deslY,
            endX > initX ? endX - initX : initX - endX,
            endY > initY ? endY - initY : initY - endY
        );

        /*
        area.setName = name;
        area.setDescription = description;
        area.setX =  initX < endX ? initX - deslX : endX - deslX;
        area.setY =  initY < endY ? initY - deslY : endY - deslY;
        area.setWidth = endX > initX ? endX - initX : initX - endX;
        area.setHeight = endY > initY ? endY - initY : initY - endY;
        */

        area.setX = area.getX / mapScale;
        area.setY = area.getY / mapScale;
        area.setWidth = area.getWidth / mapScale;
        area.setHeight = area.getHeight / mapScale;

        console.log('width: ' + area.getWidth);
        console.log('height: ' + area.getHeight);
        this.areas.push(area);
        await this.save(area);
    }

}
