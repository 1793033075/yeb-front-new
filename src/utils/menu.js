import {getRequest} from "./api";


export const initMenu=(router,store)=>{
    if(store.state.routes.length>0){
        return;
    }
    getRequest('system/cfg/menu').then(data=>{
        if(data){
            //格式化Router
            let fmtRoutes = formatRoutes(data);
            //添加到router
            router.addRoutes(fmtRoutes);
            //将数据存入vuex
            store.commit('initRoutes',fmtRoutes)
        }
    })
};

export const formatRoutes=(routes)=>{
    let fmtRoutes=[];
    routes.forEach(router=>{
        let{
            path,
            component,
            children,
        }=router;
        if(children&& children instanceof Array){
            children=formatRoutes(children);
        }
        let fmRouter={
            path:path,
            children:children,
            component(resolve){
                if(component.startsWith('Emp')){
                    require(['../views/emp/'+component+'.vue'],resolve);
                }
                require(['../views/'+component+'.vue'],resolve);

            }
        };
        fmtRoutes.push(fmRouter)
    });
    return fmtRoutes;
};
