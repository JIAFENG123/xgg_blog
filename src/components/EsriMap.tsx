import ArcGISMap from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import TileInfo from "@arcgis/core/layers/support/TileInfo";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import { useEffect } from "react";
import { useWindowSize } from "react-use";
import { useTheme } from "next-themes";

const EsriMap = () => {
  const { width } = useWindowSize();
  const { theme } = useTheme();
  useEffect(() => {
    // const layer = new WebTileLayer({
    //   urlTemplate: "https://{subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE=default&FORMAT=tiles&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}?tk=a771f083bc4501024e88f25e76d0a15a",
    //   subDomains: ["t0", "t1", "t2", "t3","t4", "t5", "t6", "t7"]
    // });
    function setContentInfo(center, scale, view) {
      const popupDiv = document.createElement("div");
      popupDiv.classList.add("mapView");

      const popupView = new MapView({
        container: popupDiv,
        map: new ArcGISMap({
          basemap: "streets",
        }) as any,
        center,
        zoom: 15,
        scale: scale * 2 * Math.max(view.width / 250, view.height / 250),
        constraints: {
          rotationEnabled: false,
        },
        ui: {
          components: [],
        },
      });
      // Return a dom node
      return popupView.container;
    }
    if (width >= 768) {
      // map.add(layer)
      const map = new ArcGISMap({
        basemap: theme === "dark" ? "dark-gray" : "streets",
        ground: "world-elevation",
        layers: [],
        //    {
        //     baseLayers: [layer],
        //   }
        //   ground: "world-elevation",
      });
      const view = new SceneView({
        container: "viewDom",
        map,
        alphaCompositingEnabled: true,
        environment: {
          background: {
            type: "color",
            color: [255, 252, 244, 0],
          },
          starsEnabled: false,
          atmosphereEnabled: false,
          lighting: {
            type: "virtual",
          },
        },
        ui: {
          components: [],
        },
      });
      const backgroundColor = view.environment.background.clone();
      backgroundColor["color"]["a"] = 0;
      view.environment.background = backgroundColor;
      view
        .when(function () {
          // SceneView is now ready for display and can be used. Here we will
          // use goTo to view a particular location at a given zoom level, camera
          // heading and tilt.
          view.goTo({
            center: [114.003311, 22.654671],
            zoom: 15,
            heading: 0,
            tilt: 30,
          });
        })
        .catch(function (err) {
          // A rejected view indicates a fatal error making it unable to display,
          // this usually means that WebGL is not available, or too old.
          console.error("SceneView rejected:", err);
        });

      view.ui.remove("attribution");

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      /*************************
       * Add a 3D point graphic
       *************************/

      // my position
      const point = {
        type: "point", // autocasts as new Point()
        x: 114.003311,
        y: 22.654671,
        z: 1010,
      };

      const markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2,
        },
      };

      const pointGraphic = new Graphic({
        geometry: point as any,
        symbol: markerSymbol,
        popupTemplate: {
          title: "我在这儿: 深圳市龙华区元芬",
          content: setContentInfo(
            [114.003311, 22.654671],
            view.scale,
            view
          ) as any,
        },
      });

      graphicsLayer.add(pointGraphic);

      /****************************
       * Add a 3D polyline graphic
       ****************************/

      const polyline = {
        type: "polyline", // autocasts as new Polyline()
        paths: [
          [114.003311, 22.654671, 0],
          [114.003311, 22.654671, 1008],
        ],
      };

      const lineSymbol = {
        type: "simple-line", // autocasts as SimpleLineSymbol()
        color: [226, 119, 40],
        width: 3,
      };

      const polylineGraphic = new Graphic({
        geometry: polyline as any,
        symbol: lineSymbol,
      });

      graphicsLayer.add(polylineGraphic);
    }
  }, [width,theme]);

  return (
    <>
      <div id="viewDom" className="h-400px rounded-lg"></div>
    </>
  );
};

export default EsriMap;
