/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itson.myevents.controllers;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.xml.ws.WebServiceRef;
import mx.itson.myevents.servicios.ArrayOfEvento;
import mx.itson.myevents.servicios.HomeService;

/**
 *
 * @author ING
 */
@ManagedBean
@RequestScoped
public class HomeController {

    @WebServiceRef(wsdlLocation = "WEB-INF/wsdl/myevents.idealabgym.com/servicios/homeservice.asmx.wsdl")
    private HomeService service;
    private String correo;
    private String contrasena;
    private final HttpServletRequest httpServletRequest;
    private final FacesContext facesContext;
    private FacesMessage faceMessage;

    /**
     * Creates a new instance of HomeController
     */
    public HomeController() {
        facesContext = FacesContext.getCurrentInstance();
        httpServletRequest = (HttpServletRequest) facesContext.getExternalContext().getRequest();
    }

    public String login() {
        if (login(correo, contrasena)) {
            httpServletRequest.getSession().setAttribute("Session", correo);
            faceMessage = new FacesMessage(FacesMessage.SEVERITY_INFO, "Acceso Correcto", null);
            facesContext.addMessage(null, faceMessage);
            return "eventos";
        } else {
            faceMessage = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Correo o Contraseña incorrecto", null);
            facesContext.addMessage(null, faceMessage);
            return "index";
        }
    }

    private boolean login(java.lang.String correo, java.lang.String contrasena) {
        // Note that the injected javax.xml.ws.Service reference as well as port objects are not thread safe.
        // If the calling of port operations may lead to race condition some synchronization is required.
        mx.itson.myevents.servicios.HomeServiceSoap port = service.getHomeServiceSoap();
        return port.login(correo, contrasena);
    }

    /**
     * @return the correo
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * @param correo the correo to set
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    /**
     * @return the contrasena
     */
    public String getContrasena() {
        return contrasena;
    }

    /**
     * @param contrasena the contrasena to set
     */
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public ArrayOfEvento eventos() {
        // Note that the injected javax.xml.ws.Service reference as well as port objects are not thread safe.
        // If the calling of port operations may lead to race condition some synchronization is required.
        mx.itson.myevents.servicios.HomeServiceSoap port = service.getHomeServiceSoap();
        return port.eventos();
    }

}
