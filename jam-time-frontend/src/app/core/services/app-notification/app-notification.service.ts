import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { computed, Injectable, Signal, signal } from "@angular/core";
import { AppNotification } from "../../interfaces/app.notification";
import { Appsettings } from "../../../../appsettings";

@Injectable({providedIn: "root"})
export class AppNotificationService {
  public notifications: Signal<AppNotification[]>;
  public notificationCount: Signal<number>;
  private notificationList = signal<AppNotification[]>([]);
  private hubConnection: HubConnection;
  private isConnected = signal<boolean>(false);

  public constructor() {
    this.notifications = computed<AppNotification[]>(this.notificationList)
    this.notificationCount = computed<number>(() => this.notificationList().length);

    const hubEndpointUrl = `${Appsettings.serverUrl}/hubs/notification`;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(hubEndpointUrl, {accessTokenFactory: (): string => localStorage.getItem("auth-access-token") ?? ''})
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    this.registerOnServerEvents();
    this.registerConnectionEvents();
    this.startConnection();
  }

  public shutdown(): void {
    this.hubConnection.stop().then();
  }

  public getNotifications(): void {
    this.hubConnection.invoke<void>('getNotifications').then();
  }

  public clearNotifications(): void {
    this.hubConnection.invoke<void>('archiveAllNotification').then();
  }

  public archiveNotification(notificationId: string): void {
    this.hubConnection.invoke<void>('archiveNotification', notificationId).then();
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on("NotificationListReceived", (notifications: AppNotification[]) => {
      this.notificationList.set(notifications);
    })
  }

  private registerConnectionEvents(): void {
    this.hubConnection.onclose(() => this.isConnected.set(false));
    this.hubConnection.onreconnected(() => this.isConnected.set(true));
    this.hubConnection.onreconnecting(() => this.isConnected.set(false));
  }

  private startConnection(): void {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(() => {
      this.isConnected.set(true)
      this.getNotifications();
    });
  }
}
